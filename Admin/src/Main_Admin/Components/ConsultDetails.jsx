import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Context/DataProvider';
import axios from 'axios';
import { Alert, CircularProgress, Snackbar, Card, CardContent, Typography, Avatar, Grid, Modal, Box } from '@mui/material';

const ConsultDetails = () => {

  const { id } = useParams();
  const { backendUrl } = useContext(DataContext);

// ------------------ USE STATES ---------------

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [open, setOpen] = useState(false)

// ----------------- FETCHING CONSULT DATA --------------

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/MainAdmin/Fetching-Consultant-Data`, { params: { id } });
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        setModalMsg({
          message: error.response?.data?.message || 'Check your connection. Try later!',
          open: true,
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [backendUrl, id]);

// ----------------- LOADER ---------------

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <CircularProgress size={40} className="text-black" />
      </div>
    );
  }

// ------------------- WHEN NO DATA AVAILABLE -------------------

  if (!data) {
    return <div className="text-center text-lg font-semibold mt-10">No Data Available</div>;
  }

  return (
    <div className="w-screen h-screen p-4 md:p-8 bg-gray-100 flex flex-col items-center overflow-y-auto">
      <Card className="w-full max-w-4xl p-4 md:p-6 bg-white shadow-lg rounded-xl overflow-y-auto">
        <CardContent>
          <Typography variant="h4" className="text-center font-bold mb-6">Consultant Details</Typography>
          
          {/* Profile Photos */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[data.consultProfilePhoto1, data.consultProfilePhoto2, data.consultProfilePhoto3].map((photo, index) => (
              photo && <Avatar key={index} src={photo} className="w-24 h-24 md:w-32 md:h-32 shadow-lg" />
            ))}
          </div>

          {/* Personal Details */}
          <div className="mb-6">
            <Typography variant="h6" className="font-semibold border-b pb-2 mb-4">Personal Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><b>Name:</b> {data.name}</Grid>
              <Grid item xs={12} md={6}><b>Email:</b> {data.email}</Grid>
              <Grid item xs={12} md={6}><b>Contact Number:</b> {data.consultPhoneNumber}</Grid>
              <Grid item xs={12} md={6}><b>Gender:</b> {data.consultGender}</Grid>
              <Grid item xs={12} md={6}><b>DOB:</b> {new Date(data.consultDOB).toDateString()}</Grid>
              <Grid item xs={12} md={6}><b>Address:</b> {data.consultAddress}</Grid>
              <Grid item xs={12} md={6}><b>Postal Code:</b> {data.consultPostalCode}</Grid>
              <Grid item xs={12} md={6}><b>Country:</b> {data.consultCountry}</Grid>
            </Grid>
            <Box className="mt-4"><b>About:</b>
            <Typography style={{ overflowWrap: 'break-word' }}>
             {data.consultAbout}
            </Typography>
            </Box>
            <Box className="mt-4"><b>Description:</b>
            <Typography style={{ overflowWrap: 'break-word' }}>
             {data.consultDescription}
            </Typography>
            </Box>
          </div>

          {/* College ID */}
          {data.consultCollegeID && (
            <div className="mb-6 text-center" onClick={() => setOpen(true)}>
              <Typography variant="h6" className="font-semibold border-b pb-2 mb-4">College ID</Typography>
              <img src={data.consultCollegeID} alt="College ID" className="w-48 h-auto mx-auto shadow-md rounded-md" />
            </div>
          )}

          {/* Academic Details */}
          <div className="mb-6">
            <Typography variant="h6" className="font-semibold border-b pb-2 mb-4">Academic Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><b>University Name:</b> {data.consultUniversityName}</Grid>
              <Grid item xs={12} md={6}><b>College Name:</b> {data.consultCollegeName}</Grid>
              <Grid item xs={12} md={6}><b>College Major:</b> {data.consultCollegeMajor}</Grid>
              <Grid item xs={12} md={6}><b>Sem Fees:</b> {data.consultSemFees}</Grid>
              <Grid item xs={12} md={6}><b>Admission Date:</b> {new Date(data.consultAdmissionDate).toDateString()}</Grid>
              <Grid item xs={12} md={6}><b>Exams Given:</b> {data.consultExamsGiven.join(', ')}</Grid>
              <Grid item xs={12} md={6}><b>Loan Amount:</b> ${data.consultBankLoan}</Grid>
              <Grid item xs={12} md={6}><b>Monthly Expenses:</b> ${data.consultMonthlyExpenses}</Grid>
            </Grid>
          </div>

          {/* Bank Details */}
          <div className="">
            <Typography variant="h6" className="font-semibold border-b pb-2 mb-4">Bank Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><b>Bank Account Holder:</b> {data.consultBankAccHolderName}</Grid>
              <Grid item xs={12} md={6}><b>Account Number:</b> {data.consultBankAccNumber}</Grid>
              <Grid item xs={12} md={6}><b>IAN Number:</b> ${data.consultBankIANnumber}</Grid>
              <Grid item xs={12} md={6}><b>Swift Code:</b> {data.consultBankSwiftCode}</Grid>
            </Grid>
          </div>

          <Box className="w-full border-b mt-6"></Box>

        {/* Social Links */}
        <div className="mt-6 text-lg font-medium text-gray-700 space-y-2">
          {data.consultLinkedin && <p style={{ overflowWrap: 'break-word' }}><b>LinkedIn:</b> {data.consultLinkedin}</p>}
          {data.consultYT && <p style={{ overflowWrap: 'break-word' }}><b>YouTube:</b> {data.consultYT}</p>}
          {data.consultInstagram && <p style={{ overflowWrap: 'break-word' }}><b>Instagram:</b> {data.consultInstagram}</p>}
          {data.consultGitHub && <p style={{ overflowWrap: 'break-word' }}><b>GitHub:</b> {data.consultGitHub}</p>}
        </div>

        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar open={modalMsg.open} autoHideDuration={3000} onClose={() => setModalMsg({ ...modalMsg, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setModalMsg({ ...modalMsg, open: false })} severity={modalMsg.severity} sx={{ width: '100%' }}>
          <b>{modalMsg.message}</b>
        </Alert>
      </Snackbar>

{/* ---------------------------- COLLEGE ID MODAL -------------------------- */}

<Modal open={open} onClose={() => setOpen(false)} aria-labelledby="verification-modal">
  <Box className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg w-[90vw] h-[80vh]">
    <button
      onClick={() => setOpen(false)}
      className="absolute top-2 right-2 text-gray-600 bg-white hover:text-gray-800"
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    {data.consultCollegeID && (
      <div className="text-center">
        <img
          src={data.consultCollegeID}
          alt="College ID"
          className="w-[90vw] h-[80vh] mx-auto shadow-md rounded-md"
        />
      </div>
    )}
  </Box>
</Modal>

    </div>
  );
};

export default ConsultDetails;