const indiaRegions = 
   [
    {
      name: "Andaman and Nicobar Islands",
      minPincode: 744101,
      maxPincode: 744304,
      numberOfPincodes: 22,
    },
    {
      name: "Andhra Pradesh",
      minPincode: 507130,
      maxPincode: 535594,
      numberOfPincodes: 1204,
    },
    {
      name: "Arunachal Pradesh",
      minPincode: 790001,
      maxPincode: 792131,
      numberOfPincodes: 48,
    },
    {
      name: "Assam",
      minPincode: 781001,
      maxPincode: 788931,
      numberOfPincodes: 571,
    },
    {
      name: "Bihar",
      minPincode: 800001,
      maxPincode: 855117,
      numberOfPincodes: 858,
    },
    {
      name: "Chandigarh",
      minPincode: 140119,
      maxPincode: 160102,
      numberOfPincodes: 24,
    },
    {
      name: "Chhattisgarh",
      minPincode: 490001,
      maxPincode: 497778,
      numberOfPincodes: 266,
    },
    {
      name: "Dadra and Nagar Haveli and Daman and Diu",
      minPincode: 396193,
      maxPincode: 396240,
      numberOfPincodes: 10, // Combined total for Dadra and Nagar Haveli and Daman and Diu
    },
    {
      name: "Delhi",
      minPincode: 110001,
      maxPincode: 110097,
      numberOfPincodes: 95,
    },
    {
      name: "Goa",
      minPincode: 403001,
      maxPincode: 403806,
      numberOfPincodes: 88,
    },
    {
      name: "Gujarat",
      minPincode: 360001,
      maxPincode: 396590,
      numberOfPincodes: 1018,
    },
    {
      name: "Haryana",
      minPincode: 121001,
      maxPincode: 136156,
      numberOfPincodes: 302,
    },
    {
      name: "Himachal Pradesh",
      minPincode: 171001,
      maxPincode: 177601,
      numberOfPincodes: 429,
    },
    {
      name: "Jammu and Kashmir",
      minPincode: 180001,
      maxPincode: 194404,
      numberOfPincodes: 209,
    },
    {
      name: "Jharkhand",
      minPincode: 813208,
      maxPincode: 835325,
      numberOfPincodes: 369,
    },
    {
      name: "Karnataka",
      minPincode: 560001,
      maxPincode: 591346,
      numberOfPincodes: 1327,
    },
    {
      name: "Kerala",
      minPincode: 670001,
      maxPincode: 695615,
      numberOfPincodes: 1408,
    },
    {
      name: "Lakshadweep",
      minPincode: 682551,
      maxPincode: 682559,
      numberOfPincodes: 9,
    },
    {
      name: "Madhya Pradesh",
      minPincode: 450001,
      maxPincode: 488448,
      numberOfPincodes: 765,
    },
    {
      name: "Maharashtra",
      minPincode: 400001,
      maxPincode: 445402,
      numberOfPincodes: 1576,
    },
    {
      name: "Manipur",
      minPincode: 795001,
      maxPincode: 795159,
      numberOfPincodes: 52,
    },
    {
      name: "Meghalaya",
      minPincode: 783123,
      maxPincode: 794115,
      numberOfPincodes: 65,
    },
    {
      name: "Mizoram",
      minPincode: 796001,
      maxPincode: 796901,
      numberOfPincodes: 42,
    },
    {
      name: "Nagaland",
      minPincode: 797001,
      maxPincode: 798627,
      numberOfPincodes: 47,
    },
    {
      name: "Odisha",
      minPincode: 751001,
      maxPincode: 770076,
      numberOfPincodes: 907,
    },
    {
      name: "Puducherry",
      minPincode: 533464,
      maxPincode: 673310,
      numberOfPincodes: 35,
    },
    {
      name: "Punjab",
      minPincode: 140001,
      maxPincode: 160104,
      numberOfPincodes: 528,
    },
    {
      name: "Rajasthan",
      minPincode: 301001,
      maxPincode: 345034,
      numberOfPincodes: 979,
    },
    {
      name: "Sikkim",
      minPincode: 737101,
      maxPincode: 737139,
      numberOfPincodes: 23,
    },
    {
      name: "Tamil Nadu",
      minPincode: 600001,
      maxPincode: 643253,
      numberOfPincodes: 2028,
    },
    {
      name: "Telangana",
      minPincode: 500001,
      maxPincode: 509412,
      numberOfPincodes: 659,
    },
    {
      name: "Tripura",
      minPincode: 799001,
      maxPincode: 799290,
      numberOfPincodes: 76,
    },
    {
      name: "Uttar Pradesh",
      minPincode: 201001,
      maxPincode: 285223,
      numberOfPincodes: 1628,
    },
    {
      name: "Uttarakhand",
      minPincode: 244712,
      maxPincode: 263680,
      numberOfPincodes: 291,
    },
    {
      name: "West Bengal",
      minPincode: 700001,
      maxPincode: 743711,
      numberOfPincodes: 1174,
    },
  ]


const states = (req, res) => {
if(req.cookies.token || req.cookies.agentToken)
{
   setTimeout(()=>{
    res.json(indiaRegions)
   },500)
}else{
   setTimeout(()=>{
    res.json({
      "error":"only verfied user can access the api sorry !!!"
  })
   },2000)
}

};

module.exports = { states };
