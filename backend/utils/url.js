module.exports = {
    createPhishingAttemptUrl: function (phishingAttemptID) {
        return `${process.env.BASE_URL}/collect_your_free_iphone/${phishingAttemptID}`;
    }
}
