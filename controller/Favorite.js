import Favorite from "../model/FavoriteModel.js";

const saveFavorite = async (req, res) => {
  const { userId, resepId } = req.body;

  try {
    await Favorite.save(userId, resepId);
    res.status(201).json({ message: "Favorite saved successfully" });
  } catch (error) {
    console.error("Error saving favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteFavorite = async (req, res) => {
  const { userId, resepId } = req.params;

  try {
    await Favorite.delete(userId, resepId);
    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkFavorite = async (req, res) => {
  const { userId, resepId } = req.params;

  try {
    const isFavorited = await Favorite.isFavorite(userId, resepId);
    res.status(200).json({ isFavorited });
  } catch (error) {
    console.error("Error checking favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFavoritesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.getFavoritesByUser(userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFavoriteCountByRecipeId = async (req, res) => {
  const { resepId } = req.params;

  try {
    const count = await Favorite.getFavoriteCountByRecipeId(resepId);
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching favorite count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { saveFavorite, deleteFavorite, checkFavorite, getFavoritesByUser, getFavoriteCountByRecipeId };
