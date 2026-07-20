const express = require("express");
const router = express.Router();

const cheerio = require("cheerio");

const axios = require("axios");

router.post("/", async (req, res) => {

    try {

        const { url } = req.body;

        if (!url) {

            return res.status(400).json({
                error: "Recipe URL required"
            });

        }

        const response = await axios.get(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
            "Accept":
                "text/html,application/xhtml+xml"
            }
        });

        const $ = cheerio.load(response.data);

        let recipeData = null;

        $('script[type="application/ld+json"]').each((i, element) => {

            try {

                const json = JSON.parse($(element).html());

                if (json["@type"] === "Recipe") {

                    recipeData = json;

                }

                if (
                    Array.isArray(json["@graph"])
                ) {

                    const recipe = json["@graph"].find(
                        item => item["@type"] === "Recipe"
                    );

                    if (recipe) {

                        recipeData = recipe;

                    }

                }

            }

            catch {

                // Ignore scripts that aren't valid JSON

            }

        });

        if (!recipeData) {

        return res.status(404).json({
            error: "No recipe found on this page."
            });

        }


        console.log(response.data.substring(0, 500));

        res.json({

            title: recipeData.name,

            ingredients: recipeData.recipeIngredient,

            instructions: recipeData.recipeInstructions

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to download webpage."
        });

    }

});

module.exports = router;