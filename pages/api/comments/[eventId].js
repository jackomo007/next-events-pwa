import {
  connectDatabase,
  getAllDocuments,
  inserDocument,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connection with database failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid data" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await inserDocument(client, "comments", newComment);
      newComment._id = result.insertId;

      res.status(201).json({
        message: "Comment added succesfully, Yayyy!",
        comment: newComment,
      });
    } catch (error) {
      res.status(500).json({ message: "Ops!, inserting comment failed." });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Error getting the documents." });
    }
  }

  client.close();
};

export default handler;
