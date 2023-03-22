export default function guardrail(mathFunction) {
  const queue = [];

  try {
    queue.push(mathFunction());
  } catch (er) {
    queue.push(String(er));
  } finally {
    queue.push('Guardrail was processed');
  }

  return queue;
}
