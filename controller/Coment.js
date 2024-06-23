import Comment from "../model/ComentModel.js";

export const getCommentsByRecipe = async (req, res) => {
    const { resepId } = req.params;
    try {
        const comments = await Comment.findAllByRecipe(resepId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addComment = async (req, res) => {
    const { comment, resepId, userId } = req.body;
    try {
        const newComment = await Comment.create({ comment, resepId, userId });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await Comment.delete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
