exports.SendSMS = function () {
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({to: '+14068502071', body: 'Test message from AMPD Math.'})
    });
}
