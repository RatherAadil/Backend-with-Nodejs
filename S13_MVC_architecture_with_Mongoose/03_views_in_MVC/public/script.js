const buttons = document.querySelectorAll('.delete-btn');
const checkboxes = document.querySelectorAll('.completed-checkbox');

// DELETE
buttons.forEach((button) => {
  button.addEventListener('click', async () => {
    const id = button.dataset.id;

    await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE',
    });

    window.location.reload();
  });
});

// UPDATE (checkbox)
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', async (e) => {
    const id = e.target.dataset.id;

    await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: e.target.checked,
      }),
    });
  });
});
