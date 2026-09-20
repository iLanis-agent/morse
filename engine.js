// Morse engine - table + encode/decode, node-testable
var TABLE = {
  A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',
  K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',
  U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
  '6':'-....','7':'--...','8':'---..','9':'----.',
  '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--',"'":'.----.','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...',':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.','-':'-....-','_':'..--.-','"':'.-..-.','$':'...-..-','@':'.--.-.'
};
var REV = {};
(function(){ for (var k in TABLE) REV[TABLE[k]] = k; })();
function encode(text) {
  // letters separated by spaces, words by ' / '
  return text.toUpperCase().split(/\s+/).filter(Boolean).map(function(word){
    return word.split('').map(function(ch){ return TABLE[ch] || ''; }).filter(Boolean).join(' ');
  }).join(' / ');
}
function decode(morse) {
  return morse.trim().split(/\s*\/\s*|\s{3,}/).map(function(word){
    return word.trim().split(/\s+/).map(function(code){ return REV[code] || ''; }).join('');
  }).join(' ');
}
function timingFor(morse, unit) {
  // returns [{on:bool, dur:ms}] for playback; unit in ms (dot). dash=3u, gap=1u, letter gap=3u, word gap=7u
  var seq = [];
  var words = morse.trim().split(/\s*\/\s*/);
  words.forEach(function(word, wi) {
    var letters = word.trim().split(/\s+/);
    letters.forEach(function(code, li) {
      code.split('').forEach(function(sym) {
        seq.push({ on: true, dur: (sym === '-' ? 3 : 1) * unit });
        seq.push({ on: false, dur: unit });
      });
      seq[seq.length - 1].dur = 3 * unit; // extend last intra gap to letter gap
    });
    seq[seq.length - 1].dur = 7 * unit; // word gap
  });
  return seq;
}
if (typeof module !== 'undefined') module.exports = { TABLE, REV, encode, decode, timingFor };
