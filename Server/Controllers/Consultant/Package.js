import Package from "../../Models/Consultant/packageSchema.js"

// --------------- UPDATING PACKAGE DETAILS ---------------

export const addPackageDetails = async (req, res) => {
  const {type, email, role, name, title, price, time, description} = req.body

  try {
    let userData = await Package.findOne({ email });

    if (!userData) {
      const newuserData = new Package({
        [`${type}Title`]: title,
        [`${type}Price`]: price,
        [`${type}Time`]: time,
        [`${type}Description`]: description,
        name: name,
        email: email,
      });
      await newuserData.save();
      return res.status(200).json({ message: "Package Updated Successfully" });
    }

    userData[`${type}Title`] = title;
    userData[`${type}Price`] = price;
    userData[`${type}Time`] = time;
    userData[`${type}Description`] = description;

    await userData.save();

    res.status(200).json({ message: "Package Updated Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong! Try Again Later."});
  }
};

// -------------- FETCHING PACKAGE DETAILS VIA EMAIL ---------------

export const fetchPackages = async(req, res) => {
  
  const {email} = req.query
  
  try {
    const packageData = await Package.findOne({email})
    if(!packageData){
      return res.status(404).json({message:"No Package Found"})
    }
    return res.status(200).json(packageData)
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong! Try Again Later."});
  }
}

// -------------- FETCHING PACKAGE DETAILS VIA ID ---------------

export const fetchPackagesById = async(req, res) => {
  
  const {id} = req.query
  
  try {
    const packageData = await Package.findOne({_id:id})
    if(!packageData){
      return res.status(404).json({message:"No Package Found"})
    }
    return res.status(200).json(packageData)
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong! Try Again Later."});
  }
}