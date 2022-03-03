import treeify from 'object-treeify';

function App() {

  const tree = (obj = {}) => {
    return treeify(obj, { /** keyNoNeighbour: '+-', keyNeighbour: '+' */ });
  }

  return (
    <div className="flex flex-col bg-black text-white h-screen">
      App UI
    </div>
  );
}

export default App;
