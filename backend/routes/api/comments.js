/**
 * DELETE /api/comments/:id
 * Removes a comment identified by the supplied MongoDB document ID.
 *
 * @param {import('express').Request} req - Express request object containing the comment ID in `req.params.id`.
 * @param {import('express').Response} res - Express response object used to return success or error JSON payloads.
 * @returns {Promise<void>} Sends a JSON response indicating success or the relevant error condition.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

//Add another endpoint for deleting a comment.
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        await comment.deleteOne();
        return res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete comment" });
    }
});

