exports.controlPump = (req, res) => {
  const { action } = req.params;
  if (action === 'on') {
    // Lógica para encender la bomba
    res.send({ message: 'Pump turned on' });
  } else if (action === 'off') {
    // Lógica para apagar la bomba
    res.send({ message: 'Pump turned off' });
  } else {
    res.status(400).send({ message: 'Invalid action' });
  }
};
