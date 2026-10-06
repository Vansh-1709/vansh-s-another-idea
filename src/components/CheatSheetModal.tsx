import React, { useState } from 'react';
import { X, BookOpen, Search, Layers, Link as LinkIcon, Network, Rows3, Sparkles } from 'lucide-react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'traversals' | 'complexities' | 'tips'>('comparison');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/80 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Data Structures Field Guide</h2>
              <p className="text-xs text-slate-400">Quick-reference cheat sheet for algorithms &amp; complexities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 py-3 border-b border-slate-800/80 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              activeTab === 'comparison'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Array vs Linked List
          </button>
          <button
            onClick={() => setActiveTab('traversals')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              activeTab === 'traversals'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Tree Traversals
          </button>
          <button
            onClick={() => setActiveTab('complexities')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              activeTab === 'complexities'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Big-O Complexity Matrix
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              activeTab === 'tips'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Pro Survival Tips
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs sm:text-sm text-slate-300">
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-800 rounded-lg">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-mono text-xs">
                      <th className="p-2.5 border-b border-slate-800">Feature</th>
                      <th className="p-2.5 border-b border-slate-800 text-emerald-400">Array</th>
                      <th className="p-2.5 border-b border-slate-800 text-cyan-400">Linked List</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Memory Allocation</td>
                      <td className="p-2.5 text-slate-300">Contiguous block in memory</td>
                      <td className="p-2.5 text-slate-300">Non-contiguous heap nodes linked by pointers</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Access by Index</td>
                      <td className="p-2.5 text-emerald-400 font-bold">O(1) Direct offset formula</td>
                      <td className="p-2.5 text-rose-400">O(N) Sequential pointer walk</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Insert / Delete at Head</td>
                      <td className="p-2.5 text-rose-400">O(N) Shifting all elements</td>
                      <td className="p-2.5 text-emerald-400 font-bold">O(1) Rewire head pointer</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Insert at Middle (given node)</td>
                      <td className="p-2.5 text-rose-400">O(N) Shifting elements</td>
                      <td className="p-2.5 text-emerald-400 font-bold">O(1) Pointer assignment</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">CPU Cache Locality</td>
                      <td className="p-2.5 text-emerald-400 font-bold">High (Spatial Locality)</td>
                      <td className="p-2.5 text-rose-400">Poor (Random pointer jumps)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Memory Overhead</td>
                      <td className="p-2.5 text-emerald-400 font-bold">Minimal (0 extra bytes)</td>
                      <td className="p-2.5 text-rose-400">+8 to 16 bytes pointer overhead/node</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-semibold text-white text-xs font-mono uppercase text-amber-400">Key Takeaway</span>
                <p className="text-xs text-slate-300 mt-1">
                  Choose Arrays when you need frequent random read access and iteration speed. Choose Linked Lists when you need guaranteed O(1) insertions/deletions at heads or given pointer positions without array resizing pauses.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'traversals' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-emerald-400 font-mono text-xs">In-Order (Left, Root, Right)</span>
                  <p className="text-xs text-slate-300 mt-1">
                    For Binary Search Trees, in-order yields elements in <strong>strictly ascending sorted order</strong>!
                  </p>
                  <pre className="mt-2 text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-400">
                    inorder(node.left)
                    visit(node)
                    inorder(node.right)
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-cyan-400 font-mono text-xs">Pre-Order (Root, Left, Right)</span>
                  <p className="text-xs text-slate-300 mt-1">
                    Visits the root first. Perfect for tree cloning, serialization, and prefix expression generation.
                  </p>
                  <pre className="mt-2 text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-400">
                    visit(node)
                    preorder(node.left)
                    preorder(node.right)
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-purple-400 font-mono text-xs">Post-Order (Left, Right, Root)</span>
                  <p className="text-xs text-slate-300 mt-1">
                    Visits children before root. Essential for deleting tree nodes bottom-up, calculating directory sizes, or postfix math.
                  </p>
                  <pre className="mt-2 text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-400">
                    postorder(node.left)
                    postorder(node.right)
                    visit(node)
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-amber-400 font-mono text-xs">Level-Order (BFS with Queue)</span>
                  <p className="text-xs text-slate-300 mt-1">
                    Visits nodes level-by-level from top to bottom, left to right. Finds shortest path in unweighted trees/graphs.
                  </p>
                  <pre className="mt-2 text-[11px] font-mono bg-slate-900 p-2 rounded text-slate-400">
                    queue.push(root)
                    while queue:
                      curr = queue.pop()
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complexities' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-800 rounded-lg">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-mono text-xs">
                      <th className="p-2.5 border-b border-slate-800">Data Structure</th>
                      <th className="p-2.5 border-b border-slate-800">Access</th>
                      <th className="p-2.5 border-b border-slate-800">Search</th>
                      <th className="p-2.5 border-b border-slate-800">Insertion</th>
                      <th className="p-2.5 border-b border-slate-800">Deletion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Array</td>
                      <td className="p-2.5 text-emerald-400">O(1)</td>
                      <td className="p-2.5 text-rose-400">O(N)</td>
                      <td className="p-2.5 text-rose-400">O(N)</td>
                      <td className="p-2.5 text-rose-400">O(N)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Stack / Queue</td>
                      <td className="p-2.5 text-rose-400">O(N)</td>
                      <td className="p-2.5 text-rose-400">O(N)</td>
                      <td className="p-2.5 text-emerald-400">O(1)</td>
                      <td className="p-2.5 text-emerald-400">O(1)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Singly Linked List</td>
                      <td className="p-2.5 text-rose-400">O(N)</td>
                      <td className="p-2.5 text-rose-400">O(N)</td>
                      <td className="p-2.5 text-emerald-400">O(1) head</td>
                      <td className="p-2.5 text-emerald-400">O(1) head</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Binary Search Tree (Avg)</td>
                      <td className="p-2.5 text-cyan-400">O(log N)</td>
                      <td className="p-2.5 text-cyan-400">O(log N)</td>
                      <td className="p-2.5 text-cyan-400">O(log N)</td>
                      <td className="p-2.5 text-cyan-400">O(log N)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">AVL / Red-Black Tree</td>
                      <td className="p-2.5 text-emerald-400">O(log N)</td>
                      <td className="p-2.5 text-emerald-400">O(log N)</td>
                      <td className="p-2.5 text-emerald-400">O(log N)</td>
                      <td className="p-2.5 text-emerald-400">O(log N)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Hash Table (Avg)</td>
                      <td className="p-2.5 text-slate-500">N/A</td>
                      <td className="p-2.5 text-emerald-400">O(1)</td>
                      <td className="p-2.5 text-emerald-400">O(1)</td>
                      <td className="p-2.5 text-emerald-400">O(1)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-semibold text-white">Binary Heap (Min/Max)</td>
                      <td className="p-2.5 text-emerald-400">O(1) peek</td>
                      <td className="p-2.5 text-rose-400">O(N)</td>
                      <td className="p-2.5 text-cyan-400">O(log N)</td>
                      <td className="p-2.5 text-cyan-400">O(log N)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="font-bold text-amber-400 text-xs font-mono">1. The Fast &amp; Slow Pointer Trick</span>
                <p className="text-xs text-slate-300 mt-1">
                  Use fast moving 2x and slow moving 1x to find middle elements, detect cycles (Floyd’s algorithm), and find palindrome splits in linked lists without knowing list length in advance.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="font-bold text-cyan-400 text-xs font-mono">2. Monotonic Stacks for Next Greater Element</span>
                <p className="text-xs text-slate-300 mt-1">
                  Whenever a problem asks for "the nearest greater/smaller element to the left or right", a monotonic stack solves it in linear O(N) time instead of brute-force O(N^2).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="font-bold text-emerald-400 text-xs font-mono">3. Dummy / Sentinel Head Nodes</span>
                <p className="text-xs text-slate-300 mt-1">
                  Always allocate a dummy head before your linked list operations (`ListNode dummy(0); dummy.next = head;`). It eliminates messy edge conditions when deleting or inserting at the head.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="font-bold text-rose-400 text-xs font-mono">4. Streak Power-Up In AlgoArena</span>
                <p className="text-xs text-slate-300 mt-1">
                  Surviving a 5-question correct streak not only doubles your points but also gives you a bonus heart if you have lost any! Keep your focus sharp.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
