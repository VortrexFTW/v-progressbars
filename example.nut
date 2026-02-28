addCommandHandler("progressbar", function(command, params, client) {
    findResourceByName("v-progressbars").exports.create(client, "test1", 3000, Vec2(50, 80), Vec2(30, 1), COLOUR_GREEN, COLOUR_BLACK);
});