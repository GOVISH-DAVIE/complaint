import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};


async function handler(req:any, res: any) {
     const baseUrl = "https://www.muganedev.tech/api/v1/";

  if (req.method == "POST"){
    const { data } = await axios.post(`${baseUrl}complaints/create`,
    req, {
      responseType: "stream",
      headers: {
      'Content-Type': req.headers["content-type"],
      'Authorization': req.headers["authorization"],
      },
    });
    data.pipe(res);
} else {
  return res.status(502).json({ message: "Bad Gateway"});
}
}

export default handler;

// export default async function handler(
// req : {params:  any, body: any},
//   res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }
// ) {
//   const auth = req.params;
//   const {fd} = req.body
//   console.log(req);
//     try {
//       const response = await fetch( {
//         method: 'POST',
//         headers: {
//           'Authorization': `Basic ${auth}`
//         },
//         body: fd
//       });
//       if (!response.ok) {
//         throw new Error('Request failed with status code ' + response.status);
//       }
//       const data = await response.json();
//       console.log('====================================');
//       console.log(data, 'PostComplaint');
//       console.log('====================================');
//       return res.status(200).json(data);
//     } catch (error) {
//       console.log('====================================');
//       console.log('Error creating new complaint', error);
//       console.log('====================================');
//     }
  
// }
  