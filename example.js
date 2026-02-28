addCommandHandler("progressbar", function(command, params, client) {
    findResourceByName("v-progressbars").exports.create(client, "test1", 3000, new Vec2(50, 80), new Vec2(30, 1), COLOUR_GREEN, COLOUR_BLACK);
});