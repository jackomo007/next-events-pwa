import { connectDatabase, inserDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({message: 'Connection with database failed'})
      return;
    }

    try {
      await inserDocument(client, 'newsLetter', {email: userEmail})
      client.close();
    } catch (error) {
      res.status(500).json({message: 'Inserting data failed'})
      return;
    }

    res.status(201).json({ message: "Signed Up!" });
  }
};

export default handler;
