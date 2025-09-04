
const Internship = require('../models/InternshipS.js'); // Importing the Internship model

const GetInternships = async (req, res) => {
    try{
        const Internships = await Internship.find({});           // Internship model se kaho ki database mein jitni bhi internships hain, sab dhoondh kar le aaye


        res.status(200).json(Internships)
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({message:'Server Error in fetching Internships'});
    }
};

const AddInternships = async (req, res) =>{

    // Client (admin panel) se aane waale data ko nikalo (company, role, etc.)
    const { company, role,duration,description } = req.body;

    try{
        const newIntern = new Internship({
            company,
            role,
            duration,
            description
        });


// Is nayi internship ko database mein save kar do
        const saveintern = await newIntern.save();

// Client ko confirmation bhej ne k liye ki internship save ho gayi hai
        res.status(201).json({message:'New Internship Added', internship: saveintern});

    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to add Internship'});
    };

};


const UpdateInternships = async (req, res) => {
    try {
        // Step 1: URL se us internship ki ID nikalo jise update karna hai
        const { id } = req.params;

        // Step 2: Client (admin panel) se aane waale naye data ko nikalo
        const {company , role, duration, description} = req.body;

        // Step 3: Database mein us ID ko dhoondho aur naye data se update kar do
        const updatedIntern = await Internship.findByIdAndUpdate(
            id,
            { company, role, duration, description },
            {new: true} // Yeh option ensure karta hai ki updated document return ho
        );

        res.status(200).json(updatedIntern);


    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to update Internship'});
    }
}


const DeleteInternships = async (req, res) => {
    try{
        const { id } = req.params;
        await Internship.findByIdAndDelete(id)

        res.status(200).json({message:'Internship Deleted Successfully'});
    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to delete Internship'});
    }
}

module.exports = {
    GetInternships,
    AddInternships,
    UpdateInternships,
    DeleteInternships
};