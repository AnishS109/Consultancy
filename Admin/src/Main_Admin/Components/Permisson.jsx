import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Snackbar, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";

const Permission = () => {
  // ---------------- FETCHING ID FROM PARAMS ---------------

  const { id } = useParams();

  // ---------------- FETCHING FROM CONTEXT ----------------

  const { backendUrl } = useContext(DataContext);

  // ---------------- USE STATES ---------------------

  const [permit, setPermit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedPermissions, setUpdatedPermissions] = useState({});
  const [modalMsg, setModalMsg] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // ----------------- FETCHING ADMIN PERMISSION DATA ----------------

  useEffect(() => {
    const fetchAdminPermissions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${backendUrl}/MainAdmin/Fetching-Admins-Permissions`,
          { params: { id } }
        );

        if (response.status === 200) {
          setPermit(response.data);
          setUpdatedPermissions({ edit: response.data.edit, delete: response.data.delete });
        }
      } catch (error) {
        setModalMsg({message:error.response?.data?.message || "Check your connection!", open:true, severity:"error"});
      } finally {
        setLoading(false);
      }
    };

    fetchAdminPermissions();
  }, [id, backendUrl]);

  // ------------------- HANDLING CHECKBOX CHANGE ---------------------

  const handleCheckboxChange = (event) => {
    setUpdatedPermissions({ ...updatedPermissions, [event.target.name]: event.target.checked });
  };

  // ------------------- SAVING CHANGES ---------------------

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${backendUrl}/MainAdmin/Update-Admins-Permissions`, {
        id,
        ...updatedPermissions
      });
      
      if (response.status === 200) {
        setModalMsg({message:"Permissions updated successfully!", open:true, severity:"success"});
      }
    } catch (error) {
      setModalMsg({message:error.response?.data?.message || "Error while updating", open:true, severity:"error"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f5f0e0]">
      {loading ? (
        <>
          <CircularProgress className="text-black" size={35} />
        </>
      ) : permit ? (
        <>
          <Box className="w-fit h-fit p-12 bg-white flex flex-col items-center rounded-3xl">
            <Typography className="text-xl text-center">
              Name: {permit?.name}
            </Typography>

            <FormGroup className="mt-6">
              <FormControlLabel 
                control={<Checkbox checked={updatedPermissions.edit} onChange={handleCheckboxChange} name="edit" />} 
                label="Edit Permission" 
              />
              <FormControlLabel 
                control={<Checkbox checked={updatedPermissions.delete} onChange={handleCheckboxChange} name="delete" />} 
                label="Delete Permission" 
              />
            </FormGroup>

            <Button 
              variant="outlined"
              className="text-black border-black normal-case mt-6"
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
          </Box>
        </>
      ) : (
        <p>No permission data available.</p>
      )}
      {/* --------------------------------- SNACKBAR --------------------------- */}
      {/* --------------------------------- SNACKBAR --------------------------- */}
      {/* --------------------------------- SNACKBAR --------------------------- */}

      <Snackbar
        open={modalMsg.open}
        autoHideDuration={3000}
        onClose={() => setModalMsg({ ...modalMsg, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setModalMsg({ ...modalMsg, open: false })}
          severity={modalMsg.severity}
          sx={{ width: "100%" }}
        >
          <b>{modalMsg.message}</b>
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Permission;