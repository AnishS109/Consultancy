import availabilitySchema from "../../Models/Consultant/availabilitySchema.js"

// ---------------- ADDING TIMING ------------------

export const AddingTimings = async (req, res) => {

  const { dayType, timeRange, email } = req.body;

  try {
    let packageTiming = await availabilitySchema.findOne({ email });

    if (!packageTiming) {
      packageTiming = new availabilitySchema({
        email,
        Availability: {
          [dayType]: [timeRange],
        },
      });
      await packageTiming.save();
      return res.status(200).json({ message: "Time Added Successfully" })
    }

    if (packageTiming.Availability[dayType]?.includes(timeRange)) {
      return res.status(400).json({ message: "Timing Already Exists" });
    }

    packageTiming.Availability[dayType].push(timeRange);
    await packageTiming.save();

    res.status(200).json({ message: "Time Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong! Try Again Later." });
  }
};

// -------------- FETCHING TIMING ----------------

export const FetchingTimings = async (req, res) => {
  const { email } = req.query;

  try {
    const timingData = await availabilitySchema.findOne({ email });

    if (!timingData) {
      return res.status(204).send(); 
    }

    return res.status(200).json(timingData);
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong! Try Again Later." });
  }
};


// -------------- DELETING TIMING ---------------

export const deletingTimeData = async (req, res) => {
  
  const { time, dayType, email } = req.body;

  try {
    const userPackage = await availabilitySchema.findOne({ email });

    if (!userPackage || !userPackage.Availability[dayType]) {
      return res.status(404).json({ message: "No time data found for deletion." });
    }

    // Remove the exact time range
    const updatedTimes = userPackage.Availability[dayType].filter(
      (t) => t !== time // Ensuring full match (e.g., "00:45 - 01:45")
    );

    if (updatedTimes.length === userPackage.Availability[dayType].length) {
      return res.status(400).json({ message: "Time not found for deletion." });
    }

    userPackage.Availability[dayType] = updatedTimes;
    await userPackage.save();

    res.status(200).json({ message: `Time ${time} removed from ${dayType} successfully.` });
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong! Try Again Later." });
  }
};
