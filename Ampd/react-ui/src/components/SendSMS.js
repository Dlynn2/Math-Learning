exports.SendSMS = function () {
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({to: '+14062418478', body: 'Test message from AMPD Math.'})
    });
}
