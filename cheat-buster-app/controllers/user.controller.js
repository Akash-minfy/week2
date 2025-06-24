const User = require('../models/user.model');
const { z } = require('zod');

const searchQuerySchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).optional(),
    name: z.string().min(1, { message: "Name cannot be empty" }).optional(),
}).refine(data => data.email || data.name, {
    message: "You must provide either an email or a name",
});

exports.searchUser = async (req, res) => {
    try {
        // 1. Validate query
        const validationResult = searchQuerySchema.safeParse(req.query);

        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.issues[0].message });
        }

        const { email, name } = validationResult.data;

        // 2. Build $or query based on what's provided
        const query = {
            $or: []
        };

        if (email) query.$or.push({ email: email });
        if (name) query.$or.push({ firstName: new RegExp(`^${name}$`, 'i') }); // case-insensitive match

        // 3. Search user
        const foundUser = await User.findOne(query);

        // 4. Respond
        if (!foundUser) {
            return res.status(404).json({ message: "Phew! Your partner is not on the list." });
        }

        res.status(200).json(foundUser);

    } catch (error) {
        res.status(500).json({ error: "An unexpected server error occurred." });
    }
};
