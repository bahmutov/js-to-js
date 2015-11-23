console.log('starting button-code.js');

console.log('can button.js use eval?',
  eval('"yes"'));

function runCode() {
  var input = document.getElementById('source');
  var source = input.value;
  console.log('running source from button-code.js "%s"', source);
  eval(source);
}
document.getElementById('run').addEventListener('click', runCode);

function attachCode() {
  console.log('attaching new code as script tag to the document');
  var newScript = document.createElement('script');
  newScript.text = 'alert("Hello from attached script");';
  document.head.appendChild(newScript);
}
document.getElementById('attach').addEventListener('click', attachCode);

console.log('finished button-code.js');
