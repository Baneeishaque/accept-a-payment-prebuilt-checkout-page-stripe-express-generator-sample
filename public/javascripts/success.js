var urlParams = new URLSearchParams(window.location.search);
var sessionId = urlParams.get('session_id');

if (sessionId) {
    fetch('/checkout-session?sessionId=' + sessionId)
        .then(function (result) {
            return result.json();
        })
        .then(function (session) {
            document.querySelector('pre').textContent = JSON.stringify(session, null, 2);
        })
        .catch(function (err) {
            console.log('Error when fetching Checkout session', err);
        });
}
