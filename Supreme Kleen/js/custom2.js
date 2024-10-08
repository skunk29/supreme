const $orderFormSubmit = document.getElementById('orderFormCustom')


function handelOrderSubmit(event) {
  event.preventDefault();

  const url = '/send-mail';
  var $inputs = $('#orderFormCustom :input');
  var $name = $('[name="name"]');
  var $email = $('[name="email"]');
  var $phone = $('[name="phone"]');
  var $address = $('[name="address"]');

  var values = {};

  if (!$name[0].value) {
    return alert('enter name')
  }

  if (!$email[0].value) {
    return alert('enter email')
  }

  if (!$phone[0].value) {
    return alert('enter phone number')
  }

  if (!$address[0].value) {
    return alert('enter address')
  }

  $inputs.each(function () {
  
    values[this.name] = $(this).val();

  });

 

  delete values.hiddenRecaptcha;
  delete values[''];
  

  window.fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(res => res.json())
    .then(res => {
      $('.successform', $orderFormSubmit).fadeIn();
      $('.successform', $orderFormSubmit).fadeOut(5000);
      $inputs.each(function () {
        values[this.name] = '';
      });
      $name[0].value = '';
      $email[0].value = '';
      $phone[0].value = '';
      $address[0].value = '';

    })
    .catch(err => {

      $('.errorform', $orderFormSubmit).fadeIn();
      $('.errorform', $orderFormSubmit).fadeOut();
    });
}

$orderFormSubmit.addEventListener('submit', handelOrderSubmit);

