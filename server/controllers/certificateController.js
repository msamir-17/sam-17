
const Certificate = require('../models/certificationS.js'); // Importing the Certificate model

const GetCertificate = async (req, res) => {
    try{
        const Certificates = await Certificate.find({});           // Certificate model se kaho ki database mein jitni bhi internships hain, sab dhoondh kar le aaye


        res.status(200).json(Certificates)
    }
    catch(err){
        res.status(500).json({message:'Server Error in fetching Certificates'});
    }
};

const AddCertificate = async (req, res) =>{

    // Client (admin panel) se aane waale data ko nikalo (title, issuedBy, etc.)
    const { title, issuedBy, dateEarned, link } = req.body;

    try{
        const newCertificate = new Certificate({
            title,
            issuedBy,
            dateEarned,
            link
        });


// Is nayi internship ko database mein save kar do
        const saveCertificate = await newCertificate.save();

// Client ko confirmation bhej ne k liye ki internship save ho gayi hai
        res.status(201).json({message:'New Certificate Added', certificate: saveCertificate});

    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to add Certificate'});
    };

};


const UpdateCertificate = async (req, res) => {
    try {
        // Step 1: URL se us internship ki ID nikalo jise update karna hai
        const { id } = req.params;

        // console.log(id);
        // console.log(req.body);

        // Step 2: Client (admin panel) se aane waale naye data ko nikalo
        const {title , issuedBy, dateEarned, link} = req.body;

        // Step 3: Database mein us ID ko dhoondho aur naye data se update kar do
        const updatedcertificate = await Certificate.findByIdAndUpdate(
            id,
            { title, issuedBy, dateEarned, link },
            {new: true} // Yeh option ensure karta hai ki updated document return ho
        );

        res.status(200).json(updatedcertificate);


    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to update Certificate'});
    }
}


const DeleteCertificate = async (req, res) => {
    try{
        const { id } = req.params;
        await Certificate.findByIdAndDelete(id)

        res.status(200).json({message:'Certificate Deleted Successfully'});
    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to delete Certificate'});
    }
}

module.exports = {
    GetCertificate,
    AddCertificate,
    UpdateCertificate,
    DeleteCertificate
};