import { Question, TopicId } from '../types/game';

export interface TopicInfo {
  id: TopicId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  accentBorder: string;
  totalAvailable: number;
}

export const TOPICS: TopicInfo[] = [
  {
    id: 'arrays',
    name: 'Arrays & Strings',
    tagline: 'Contiguous memory, indexing, two pointers',
    description: 'Master cache locality, amortized dynamic array resizing, prefix sums, and two-pointer traversal.',
    icon: 'Layers',
    color: 'emerald',
    gradient: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
    accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
    totalAvailable: 16,
  },
  {
    id: 'linked_lists',
    name: 'Linked Lists',
    tagline: 'Pointers, nodes, cycles & reversals',
    description: 'Conquer pointer surgery, singly vs doubly linked lists, Floyd’s cycle detection, and dummy head tricks.',
    icon: 'Link',
    color: 'cyan',
    gradient: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
    accentBorder: 'border-cyan-500/40 hover:border-cyan-400',
    totalAvailable: 16,
  },
  {
    id: 'trees',
    name: 'Trees & BSTs',
    tagline: 'Hierarchies, traversals & balance',
    description: 'Traverse pre/in/post-order, binary search trees, tree balance invariants, and lowest common ancestors.',
    icon: 'Network',
    color: 'purple',
    gradient: 'from-purple-500/20 via-purple-600/10 to-transparent',
    accentBorder: 'border-purple-500/40 hover:border-purple-400',
    totalAvailable: 16,
  },
  {
    id: 'stacks_queues',
    name: 'Stacks & Queues',
    tagline: 'LIFO, FIFO, deques & monotonic order',
    description: 'Delve into function call stacks, parenthesis matching, sliding window minimums, and circular buffers.',
    icon: 'Rows3',
    color: 'amber',
    gradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
    accentBorder: 'border-amber-500/40 hover:border-amber-400',
    totalAvailable: 16,
  },
  {
    id: 'special_round',
    name: 'The Boss Gauntlet',
    tagline: 'Special round: all topics + heaps & graphs',
    description: 'The ultimate survival test. High-stakes mixed questions from all structures with aggressive difficulty scaling and maximum score bonuses.',
    icon: 'Flame',
    color: 'rose',
    gradient: 'from-rose-500/20 via-rose-600/10 to-transparent',
    accentBorder: 'border-rose-500/40 hover:border-rose-400',
    totalAvailable: 20,
  },
];

export const ALL_QUESTIONS: Question[] = [
  // ==========================================
  // ARRAYS & STRINGS (16 Questions: L1 to L4)
  // ==========================================
  {
    id: 'arr_1',
    topic: 'arrays',
    difficulty: 'easy',
    level: 1,
    title: 'Random Access Complexity',
    question: 'Why does accessing an element in an array by index take O(1) constant time?',
    options: [
      'Elements are searched in parallel using hardware threads',
      'Memory address can be calculated directly via base_address + index * element_size',
      'The CPU creates an internal hash table for all indices',
      'Arrays store pointers that automatically resolve without RAM access'
    ],
    correctAnswer: 1,
    explanation: 'Because array elements are stored in contiguous memory addresses, address of element at index i is simply: BaseAddress + (i * size_of_data_type), allowing direct single-cycle calculation.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Contiguous Memory'
  },
  {
    id: 'arr_2',
    topic: 'arrays',
    difficulty: 'easy',
    level: 1,
    title: 'Dynamic Array Amortized Resizing',
    question: 'When a dynamic array (like std::vector or Python list) runs out of capacity and doubles its size, what is the amortized cost per append operation?',
    options: [
      'O(N)',
      'O(log N)',
      'O(1)',
      'O(N^2)'
    ],
    correctAnswer: 2,
    explanation: 'Although resizing takes O(N) copy operations once in a while, doubling capacity ensures resizing happens exponentially less often. The sum of copies over N inserts is at most ~2N, resulting in O(1) amortized cost per append.',
    timeComplexity: 'Amortized O(1)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Amortized Analysis'
  },
  {
    id: 'arr_3',
    topic: 'arrays',
    difficulty: 'easy',
    level: 1,
    title: 'Insertion at Beginning',
    question: 'What is the worst-case time complexity of inserting an element at index 0 in a fixed-size static array with available buffer at the end?',
    options: [
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(N log N)'
    ],
    correctAnswer: 2,
    explanation: 'Inserting at index 0 requires shifting every existing element from index 0 to N-1 one position to the right, which takes linear O(N) operations.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Element Shifting'
  },
  {
    id: 'arr_4',
    topic: 'arrays',
    difficulty: 'easy',
    level: 1,
    title: 'Two Pointer Technique Basis',
    question: 'Which precondition is typically required to solve the Two-Sum problem in O(N) time with O(1) auxiliary space using two pointers moving towards each other?',
    options: [
      'The array must contain only positive integers',
      'The array elements must already be sorted in ascending order',
      'The array length must be an even number',
      'All numbers must be distinct'
    ],
    correctAnswer: 1,
    explanation: 'The inward two-pointer technique relies on sorted order: if the current sum is too small, advance the left pointer; if too large, decrement the right pointer.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Two Pointers'
  },
  {
    id: 'arr_5',
    topic: 'arrays',
    difficulty: 'medium',
    level: 2,
    title: '2D Matrix Row-Major vs Column-Major',
    question: 'In C/C++ or standard JavaScript typed arrays, which loop traverses a 2D matrix [R][C] significantly faster due to CPU cache spatial locality?',
    options: [
      'Outer loop over columns (c), inner loop over rows (r)',
      'Outer loop over rows (r), inner loop over columns (c)',
      'Both take the exact same time because both touch R*C elements',
      'Diagonal zig-zag traversal'
    ],
    correctAnswer: 1,
    explanation: 'In row-major order, elements in the same row are stored sequentially in memory. Accessing row-by-row leverages CPU cache lines (spatial locality), minimizing cache misses.',
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Cache Locality'
  },
  {
    id: 'arr_6',
    topic: 'arrays',
    difficulty: 'medium',
    level: 2,
    title: 'Prefix Sum Array Purpose',
    question: 'Given an array of size N, what are the time complexities for constructing a prefix sum array and answering any range sum query (L to R)?',
    options: [
      'Construction: O(N), Query: O(1)',
      'Construction: O(1), Query: O(N)',
      'Construction: O(N log N), Query: O(log N)',
      'Construction: O(N^2), Query: O(1)'
    ],
    correctAnswer: 0,
    explanation: 'Prefix sum array precalculates prefix[i] = prefix[i-1] + arr[i] in O(N) time. Any sub-range sum between indices L and R is answered in O(1) via prefix[R] - prefix[L-1].',
    timeComplexity: 'Query O(1), Build O(N)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Prefix Sums'
  },
  {
    id: 'arr_7',
    topic: 'arrays',
    difficulty: 'medium',
    level: 2,
    title: 'Sliding Window Invariant',
    question: 'What is the runtime of finding the maximum sum subarray of fixed size K in an array of size N using the sliding window approach?',
    options: [
      'O(N * K)',
      'O(N log K)',
      'O(N)',
      'O(K log N)'
    ],
    correctAnswer: 2,
    explanation: 'Rather than recalculating sum of each window of size K in O(K) (which yields O(N*K)), sliding window subtracts the element falling out and adds the incoming element in O(1) per step, yielding overall O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Sliding Window'
  },
  {
    id: 'arr_8',
    topic: 'arrays',
    difficulty: 'medium',
    level: 2,
    title: 'In-Place Reversal Algorithm',
    codeSnippet: `void reverse(int arr[], int left, int right) {
    while (left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}`,
    question: 'How many element swaps are performed when reversing an array of N elements?',
    options: [
      'N swaps',
      '⌊N / 2⌋ swaps',
      '2N swaps',
      'N - 1 swaps'
    ],
    correctAnswer: 1,
    explanation: 'The two pointers meet in the center. In each iteration, two elements are swapped, so exactly ⌊N/2⌋ swaps occur.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'In-place Algorithms'
  },
  {
    id: 'arr_9',
    topic: 'arrays',
    difficulty: 'hard',
    level: 3,
    title: 'Kadane’s Algorithm DP State',
    codeSnippet: `int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0], currMax = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currMax = max(nums[i], currMax + nums[i]);
        maxSoFar = max(maxSoFar, currMax);
    }
    return maxSoFar;
}`,
    question: 'What decision does the expression `max(nums[i], currMax + nums[i])` represent at each index i?',
    options: [
      'Whether to sort the array or leave it unchanged',
      'Whether to start a brand new subarray at nums[i] or extend the existing subarray',
      'Whether nums[i] is positive or negative',
      'Whether to multiply or add adjacent elements'
    ],
    correctAnswer: 1,
    explanation: 'If `currMax` becomes negative, adding it to `nums[i]` only hurts the sum. Thus, Kadane dynamically decides: start fresh at nums[i], or extend the previous running contiguous sum.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Kadane Algorithm'
  },
  {
    id: 'arr_10',
    topic: 'arrays',
    difficulty: 'hard',
    level: 3,
    title: 'Dutch National Flag Partitioning',
    question: 'In Dijkstra’s Dutch National Flag 3-way partitioning (sorting 0s, 1s, and 2s in-place), how many pointers are maintained and what is the maximum number of passes?',
    options: [
      '2 pointers, 2 passes',
      '3 pointers (low, mid, high), single pass O(N)',
      '4 pointers, O(N log N) passes',
      '1 pointer, O(N^2) bubble passes'
    ],
    correctAnswer: 1,
    explanation: 'Dijkstra used 3 pointers: low (boundary of 0s), mid (current scanning index), and high (boundary of 2s). It partitions the array in a single O(N) pass with O(1) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: '3-Way Partitioning'
  },
  {
    id: 'arr_11',
    topic: 'arrays',
    difficulty: 'hard',
    level: 3,
    title: 'Matrix 90-Degree Rotation In-Place',
    question: 'To rotate an N x N square matrix 90 degrees clockwise in-place with O(1) extra space, which two operations should be chained together?',
    options: [
      'Transpose matrix across main diagonal, then reverse each row',
      'Reverse each column, then invert all elements',
      'Transpose matrix, then transpose secondary diagonal',
      'Shift elements clockwise by N modulo 4'
    ],
    correctAnswer: 0,
    explanation: 'Rotating clockwise by 90°: Transpose matrix (swap matrix[i][j] with matrix[j][i]), then reverse each horizontal row. Both steps take O(N^2) time and O(1) auxiliary space.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Matrix Transformation'
  },
  {
    id: 'arr_12',
    topic: 'arrays',
    difficulty: 'hard',
    level: 3,
    title: 'Circular Array Next Index Calculation',
    question: 'In a circular array of size N, if current pointer is at index `curr`, what is the formula to advance `k` steps forward safely wrapping around?',
    options: [
      '(curr + k) % N',
      '(curr * k) / N',
      'curr + (k % N)',
      '(curr + k) - N'
    ],
    correctAnswer: 0,
    explanation: 'The modulo operator wraps index when it reaches or exceeds N: `(curr + k) % N`. For negative backward steps, `(curr - k + N) % N` is used.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Circular Buffer'
  },
  {
    id: 'arr_13',
    topic: 'arrays',
    difficulty: 'master',
    level: 4,
    title: 'Cache Line False Sharing in Arrays',
    question: 'In high-performance multi-threaded code, why does having two threads concurrently write to adjacent indices `arr[0]` and `arr[1]` cause severe performance degradation?',
    options: [
      'Array indices lock the entire RAM bus',
      'False Sharing: both elements reside on the same 64-byte cache line, causing cache invalidations between CPU cores',
      'Compilers refuse to vectorize adjacent writes',
      'The memory controller must re-allocate memory upon each write'
    ],
    correctAnswer: 1,
    explanation: 'Modern CPU caches load data in 64-byte chunks (cache lines). When two cores write to different variables residing on the same cache line, the MESI cache coherency protocol constantly invalidates the line across cores.',
    timeComplexity: 'Severe stall cycles',
    spaceComplexity: 'Cache Line Contention',
    conceptTag: 'Hardware Architecture'
  },
  {
    id: 'arr_14',
    topic: 'arrays',
    difficulty: 'master',
    level: 4,
    title: 'Boyer-Moore Majority Vote Invariant',
    codeSnippet: `int majorityElement(vector<int>& nums) {
    int candidate = 0, count = 0;
    for (int num : nums) {
        if (count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    }
    return candidate;
}`,
    question: 'Why is Boyer-Moore guaranteed to identify the element occurring strictly more than ⌊N/2⌋ times in a single pass?',
    options: [
      'Every time two distinct elements are paired and discarded, the true majority remains strictly > remaining_elements / 2',
      'It sorts elements implicitly into binary buckets',
      'Candidate is chosen as the median of the first three items',
      'Count can never reach zero if a majority element exists'
    ],
    correctAnswer: 0,
    explanation: 'The majority element has frequency > N/2. Discarding any two different elements can reduce majority count by at most 1 while reducing total elements by 2, preserving majority dominance.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Boyer-Moore Voting'
  },
  {
    id: 'arr_15',
    topic: 'arrays',
    difficulty: 'master',
    level: 4,
    title: 'Sparse Array Memory Optimization',
    question: 'When storing an extremely large 10,000 x 10,000 matrix with 99.9% zeros, which representation yields the optimal balance of compact storage and fast matrix-vector multiplication?',
    options: [
      'Dense 2D continuous array',
      'CSR (Compressed Sparse Row) or COO (Coordinate list)',
      'Linked list of 100,000,000 nodes',
      'Bitset boolean array'
    ],
    correctAnswer: 1,
    explanation: 'CSR (Compressed Sparse Row) stores non-zero values, column indices, and row pointers in 3 compact 1D arrays, reducing storage from 100M entries to ~100k entries with optimal cache-friendly streaming for multiplications.',
    timeComplexity: 'O(non-zeros)',
    spaceComplexity: 'O(non-zeros)',
    conceptTag: 'Sparse Representation'
  },
  {
    id: 'arr_16',
    topic: 'arrays',
    difficulty: 'master',
    level: 4,
    title: 'Sliding Window Maximum Monotonic Deque',
    question: 'What is the amortized time complexity per element when finding the maximum element in every sliding window of size K across an array of length N using a monotonic deque?',
    options: [
      'O(K)',
      'O(log K)',
      'O(1) amortized (total O(N))',
      'O(K log N)'
    ],
    correctAnswer: 2,
    explanation: 'Each array element index is pushed into the monotonic deque at most once and popped at most once across the entire traversal. Therefore, the total operations for N elements is 2N, or O(1) amortized per window slide.',
    timeComplexity: 'O(N) overall',
    spaceComplexity: 'O(K)',
    conceptTag: 'Monotonic Deque'
  },

  // ==========================================
  // LINKED LISTS (16 Questions: L1 to L4)
  // ==========================================
  {
    id: 'll_1',
    topic: 'linked_lists',
    difficulty: 'easy',
    level: 1,
    title: 'Head Insertion Complexity',
    question: 'What is the time complexity to insert a new node at the head of a singly linked list when given a direct reference to the head pointer?',
    options: [
      'O(N)',
      'O(1)',
      'O(log N)',
      'O(N^2)'
    ],
    correctAnswer: 1,
    explanation: 'Inserting at the head merely requires setting `newNode->next = head` and updating `head = newNode`. No elements are shifted, so it takes constant O(1) time.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'List Fundamentals'
  },
  {
    id: 'll_2',
    topic: 'linked_lists',
    difficulty: 'easy',
    level: 1,
    title: 'Random Access in Linked Lists',
    question: 'Why can’t a singly linked list perform O(1) random access to the k-th element like an array does?',
    options: [
      'Linked lists are always allocated on the hardware GPU',
      'Nodes are scattered across dynamic memory (heap); following pointers requires sequential traversal from the head',
      'Linked list nodes can only hold characters, not numbers',
      'Linked list pointers take O(log N) cycles to decode'
    ],
    correctAnswer: 1,
    explanation: 'Nodes are non-contiguous heap allocations linked via pointer references. To access index k, the CPU must start at head and dereference `next` pointers k times sequentially.',
    timeComplexity: 'O(K)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Pointer Traversal'
  },
  {
    id: 'll_3',
    topic: 'linked_lists',
    difficulty: 'easy',
    level: 1,
    title: 'Singly vs Doubly Linked Memory',
    question: 'How much pointer memory overhead does each node in a Doubly Linked List have on a 64-bit architecture compared to a Singly Linked List?',
    options: [
      'Same memory overhead (1 pointer)',
      '8 extra bytes (one additional 64-bit `prev` pointer)',
      '16 extra bytes',
      'No pointer overhead if using struct padding'
    ],
    correctAnswer: 1,
    explanation: 'On 64-bit systems, a pointer is 8 bytes. A doubly linked list node holds both `next` and `prev` pointers (16 bytes of pointers), whereas singly holds only `next` (8 bytes), adding 8 bytes per node.',
    timeComplexity: 'N/A',
    spaceComplexity: '8 bytes/node overhead',
    conceptTag: 'Memory Layout'
  },
  {
    id: 'll_4',
    topic: 'linked_lists',
    difficulty: 'easy',
    level: 1,
    title: 'Circular Linked List Property',
    question: 'In a Singly Circular Linked List, what does the `next` pointer of the last node point to?',
    options: [
      'NULL / nullptr',
      'The head node of the list',
      'The previous node',
      'Itself'
    ],
    correctAnswer: 1,
    explanation: 'In a circular linked list, the tail node points back to the head node, forming a closed ring without any NULL terminating pointers.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Circular Lists'
  },
  {
    id: 'll_5',
    topic: 'linked_lists',
    difficulty: 'medium',
    level: 2,
    title: 'Dummy / Sentinel Node Purpose',
    question: 'Why do competitive programmers and systems engineers frequently use a dummy (sentinel) head node when implementing linked list deletions or merges?',
    options: [
      'It speeds up CPU cache retrieval by 10x',
      'It eliminates special edge case handling for operations at head or on empty lists',
      'It automatically prevents circular memory references',
      'It converts singly linked lists into doubly linked lists'
    ],
    correctAnswer: 1,
    explanation: 'With a dummy node preceding the actual head, head modifications behave identically to mid-list modifications, removing `if (head == NULL)` or `if (curr == head)` branching.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Sentinel Nodes'
  },
  {
    id: 'll_6',
    topic: 'linked_lists',
    difficulty: 'medium',
    level: 2,
    title: 'Finding Middle Element',
    visualDiagram: {
      type: 'linked_list',
      content: '[1] -> [2] -> [3] -> [4] -> [5] -> NULL\n S      F\n        S             F\n               S                   F (NULL)'
    },
    question: 'When using slow and fast pointers to find the middle of a linked list in one pass, at what speeds do the pointers advance?',
    options: [
      'Slow moves 1 step, fast moves 1 step',
      'Slow moves 1 step, fast moves 2 steps',
      'Slow moves 2 steps, fast moves 4 steps',
      'Slow moves backward, fast moves forward'
    ],
    correctAnswer: 1,
    explanation: 'Fast travels twice as fast as slow (`slow = slow->next; fast = fast->next->next`). When fast reaches the end (NULL or last node), slow is positioned exactly at the midpoint.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Fast & Slow Pointers'
  },
  {
    id: 'll_7',
    topic: 'linked_lists',
    difficulty: 'medium',
    level: 2,
    title: 'In-Place List Reversal Steps',
    codeSnippet: `ListNode* curr = head;
ListNode* prev = NULL;
while (curr != NULL) {
    ListNode* nextTemp = curr->next;
    curr->next = prev;
    prev = curr;
    curr = nextTemp;
}
return prev;`,
    question: 'What is the primary role of the temporary pointer `nextTemp` inside the while loop?',
    options: [
      'To verify whether curr is the tail node',
      'To preserve the link to the rest of the list before reversing curr->next',
      'To free deleted heap memory',
      'To keep track of list length'
    ],
    correctAnswer: 1,
    explanation: 'Once `curr->next = prev` is executed, the original connection to the rest of the list is severed. Without saving `curr->next` into `nextTemp` beforehand, the remainder of the list would be orphaned and lost.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Pointer Manipulation'
  },
  {
    id: 'll_8',
    topic: 'linked_lists',
    difficulty: 'medium',
    level: 2,
    title: 'Floyd’s Cycle Detection (Tortoise and Hare)',
    question: 'If a linked list contains a cycle of length C, what is the maximum number of steps before slow and fast pointers collide within the cycle?',
    options: [
      'At most C steps after slow enters the loop',
      'Exponential 2^C steps',
      'Infinity; they might miss each other forever',
      'Exactly 1 step'
    ],
    correctAnswer: 0,
    explanation: 'Once slow enters the cycle, with every step the relative distance between fast and slow decreases by 1 modulo C. Because distance decreases by 1 every step, collision is guaranteed in $\\le C$ steps.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Floyd Cycle Finding'
  },
  {
    id: 'll_9',
    topic: 'linked_lists',
    difficulty: 'hard',
    level: 3,
    title: 'Floyd Cycle Start Location Math',
    question: 'After slow and fast collide inside a cycle, why does moving slow to `head` and advancing both slow and fast by 1 step at a time guarantee they meet at the cycle start node?',
    options: [
      'Because total nodes in list is always divisible by 2',
      'Mathematical invariant: distance from head to cycle start equals distance from collision node to cycle start around the loop',
      'Fast pointer reverses direction automatically',
      'Because the slow pointer jumps to the midpoint'
    ],
    correctAnswer: 1,
    explanation: 'Let distance to cycle start be L, loop start to collision be d, loop length C. 2(L + d) = L + d + kC -> L = kC - d = (k-1)C + (C - d). Walking L steps from head matches walking L steps from collision node!',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Mathematical Invariant'
  },
  {
    id: 'll_10',
    topic: 'linked_lists',
    difficulty: 'hard',
    level: 3,
    title: 'Intersection of Two Singly Linked Lists',
    visualDiagram: {
      type: 'linked_list',
      content: 'A: [1] -> [2] \\ \n               -> [8] -> [4] -> [5]\nB:      [3] /'
    },
    question: 'Two singly linked lists intersect at node [8]. How can you find the intersection node in O(N+M) time and O(1) space without modifying node structures?',
    options: [
      'Hash table of all memory addresses',
      'Traverse each pointer; when pointer A hits NULL reset to head B, when B hits NULL reset to head A until pointers meet',
      'Reverse both lists simultaneously',
      'Sort both lists by address'
    ],
    correctAnswer: 1,
    explanation: 'By redirecting pointer A to head B and B to head A upon reaching end, both traverse exactly len(A) + len(B) steps, equalizing path lengths and meeting at the intersection node or NULL simultaneously.',
    timeComplexity: 'O(A + B)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Path Equalization'
  },
  {
    id: 'll_11',
    topic: 'linked_lists',
    difficulty: 'hard',
    level: 3,
    title: 'Delete Node without Head Reference',
    codeSnippet: `void deleteNode(ListNode* node) {
    node->val = node->next->val;
    ListNode* temp = node->next;
    node->next = node->next->next;
    delete temp;
}`,
    question: 'What is the critical limitation of this O(1) "node copy & bypass" deletion trick?',
    options: [
      'It cannot delete the head node',
      'It cannot be applied if the target node is the tail node (last node in the list)',
      'It fails if values are duplicate',
      'It only works in doubly linked lists'
    ],
    correctAnswer: 1,
    explanation: 'If `node` is the tail, `node->next` is NULL, so dereferencing `node->next->val` causes a NULL pointer dereference crash. There is no subsequent node whose value can be copied.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Edge Cases'
  },
  {
    id: 'll_12',
    topic: 'linked_lists',
    difficulty: 'hard',
    level: 3,
    title: 'Reverse Linked List in K-Group',
    question: 'When reversing a linked list in groups of size K, what is the optimal time and auxiliary space complexity?',
    options: [
      'Time O(N log K), Space O(K)',
      'Time O(N), Space O(1) iterative',
      'Time O(N^2), Space O(1)',
      'Time O(N), Space O(N)'
    ],
    correctAnswer: 1,
    explanation: 'By checking ahead for K nodes and performing standard pointer reversal on each K-segment in-place, the whole list is reversed in O(N) time with strictly O(1) iterative pointer space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Group Reversal'
  },
  {
    id: 'll_13',
    topic: 'linked_lists',
    difficulty: 'master',
    level: 4,
    title: 'XOR Linked List (Memory-Efficient)',
    question: 'In an XOR Linked List, each node stores a single pointer field `npx = prev ⊕ next`. How do you traverse forward from head to tail?',
    options: [
      'Traverse with a single pointer `curr = npx`',
      'Maintain `prev` and compute next node via `next = prev ⊕ curr->npx`',
      'Store all prev addresses in a separate stack',
      'Use modulo hashing on pointer values'
    ],
    correctAnswer: 1,
    explanation: 'Because `A ⊕ (A ⊕ B) = B`, taking the known `prev` address and XORing it with `curr->npx` yields `prev ⊕ (prev ⊕ next) = next`, allowing bidirectional traversal with half the pointer storage!',
    timeComplexity: 'O(1) per step',
    spaceComplexity: '1 pointer field per node',
    conceptTag: 'XOR Linked List'
  },
  {
    id: 'll_14',
    topic: 'linked_lists',
    difficulty: 'master',
    level: 4,
    title: 'Skip List Expected Search Complexity',
    question: 'A Skip List uses multi-level linked lists with randomized geometric node heights. What are its expected search, insertion, and deletion time complexities?',
    options: [
      'O(N) for all operations',
      'O(log N) expected for all three operations',
      'O(1) search, O(N) insertion',
      'O(N log N) expected'
    ],
    correctAnswer: 1,
    explanation: 'A Skip List gives balanced BST performance (O(log N) search, insert, delete) using linked lists with coin-flip probabilistic promotion of node pointers to express lanes.',
    timeComplexity: 'O(log N) expected',
    spaceComplexity: 'O(N)',
    conceptTag: 'Skip List'
  },
  {
    id: 'll_15',
    topic: 'linked_lists',
    difficulty: 'master',
    level: 4,
    title: 'LRU Cache Design',
    question: 'Why does an optimal LRU (Least Recently Used) cache combine a Hash Table with a Doubly Linked List rather than a Singly Linked List?',
    options: [
      'Singly linked lists do not support hash tables',
      'Doubly linked lists allow removing an arbitrary node in O(1) given its node pointer, while singly requires O(N) to find the predecessor',
      'Doubly linked lists consume fewer bytes than singly linked lists',
      'To prevent memory fragmentation in heap allocations'
    ],
    correctAnswer: 1,
    explanation: 'When an item is accessed in LRU, it must be detached and moved to the front. With doubly linked list, `node->prev->next = node->next` is O(1). In singly, finding predecessor requires traversing from head.',
    timeComplexity: 'O(1) get & put',
    spaceComplexity: 'O(Capacity)',
    conceptTag: 'LRU Cache Architecture'
  },
  {
    id: 'll_16',
    topic: 'linked_lists',
    difficulty: 'master',
    level: 4,
    title: 'Copy List with Random Pointer O(1) Space',
    question: 'How can a linked list where each node has `next` and `random` pointers be cloned in O(N) time without using a hash table map for visited nodes?',
    options: [
      'By interleaving each cloned node directly after its original node (`curr->next = clone`), copying randoms via `clone->random = curr->random->next`, then unweaving',
      'By sorting nodes by memory address and running binary search',
      'By converting the list into an adjacency matrix',
      'It is mathematically impossible without O(N) auxiliary hash storage'
    ],
    correctAnswer: 0,
    explanation: 'Weaving each clone right behind its original (`A -> A\' -> B -> B\'`) links `clone->random = orig->random->next` in O(1) space. A final pass decouples the intertwined lists back to original and clone.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) aux',
    conceptTag: 'Node Interleaving'
  },

  // ==========================================
  // TREES & BSTs (16 Questions: L1 to L4)
  // ==========================================
  {
    id: 'tree_1',
    topic: 'trees',
    difficulty: 'easy',
    level: 1,
    title: 'Binary Tree In-Order Traversal Order',
    question: 'In what sequence does an In-Order traversal visit nodes in a binary tree?',
    options: [
      'Root -> Left Subtree -> Right Subtree',
      'Left Subtree -> Root -> Right Subtree',
      'Left Subtree -> Right Subtree -> Root',
      'Root -> Right Subtree -> Left Subtree'
    ],
    correctAnswer: 1,
    explanation: 'In-order traversal visits: 1. Left subtree recursively, 2. Current Root node, 3. Right subtree recursively. For a Binary Search Tree (BST), this always yields keys in ascending sorted order.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    conceptTag: 'Tree Traversals'
  },
  {
    id: 'tree_2',
    topic: 'trees',
    difficulty: 'easy',
    level: 1,
    title: 'BST Invariant Property',
    question: 'What invariant must hold for EVERY node X in a valid Binary Search Tree (BST) without duplicates?',
    options: [
      'All nodes in left subtree < X, and all nodes in right subtree > X',
      'Left child < X, but grandchildren can be any value',
      'Tree must have an equal number of leaves on left and right',
      'Every node must have exactly two children'
    ],
    correctAnswer: 0,
    explanation: 'The BST property applies to the entire subtree, not just immediate children: all keys in the left subtree must be strictly less than X, and all keys in the right subtree strictly greater than X.',
    timeComplexity: 'O(N) validation',
    spaceComplexity: 'O(H)',
    conceptTag: 'BST Invariant'
  },
  {
    id: 'tree_3',
    topic: 'trees',
    difficulty: 'easy',
    level: 1,
    title: 'Maximum Nodes in Binary Tree of Height H',
    question: 'What is the maximum number of nodes in a binary tree of height H (where root alone has height 1)?',
    options: [
      '2^H - 1',
      '2^H + 1',
      'H^2',
      '2 * H'
    ],
    correctAnswer: 0,
    explanation: 'Level 1 has 2^0=1 node, level 2 has 2^1=2, level H has 2^(H-1). Sum of geometric series is 1 + 2 + 4 + ... + 2^(H-1) = 2^H - 1.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Tree Capacity'
  },
  {
    id: 'tree_4',
    topic: 'trees',
    difficulty: 'easy',
    level: 1,
    title: 'Level-Order Traversal Structure',
    question: 'Which auxiliary data structure is fundamentally used to implement Breadth-First Search (Level-Order Traversal) of a binary tree iteratively?',
    options: [
      'Stack (LIFO)',
      'Queue (FIFO)',
      'Hash Map',
      'Priority Queue'
    ],
    correctAnswer: 1,
    explanation: 'Level-order explores nodes level-by-level from left to right. A FIFO Queue ensures nodes discovered first are processed and expanded first.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(W)',
    conceptTag: 'BFS / Level Order'
  },
  {
    id: 'tree_5',
    topic: 'trees',
    difficulty: 'medium',
    level: 2,
    title: 'BST Worst-Case Search Complexity',
    question: 'What is the worst-case search time complexity in an un-balanced Binary Search Tree with N nodes?',
    options: [
      'O(log N)',
      'O(N)',
      'O(N log N)',
      'O(1)'
    ],
    correctAnswer: 1,
    explanation: 'If elements are inserted in already sorted order (e.g. 1, 2, 3, 4, 5), the BST degenerates into a linear linked list of height N, resulting in O(N) search.',
    timeComplexity: 'Worst O(N), Balanced O(log N)',
    spaceComplexity: 'O(N)',
    conceptTag: 'BST Degeneration'
  },
  {
    id: 'tree_6',
    topic: 'trees',
    difficulty: 'medium',
    level: 2,
    title: 'BST In-Order Successor',
    visualDiagram: {
      type: 'tree',
      content: '       (20)\n      /    \\\n    (10)   (30)\n      \\    /\n      (15)(25)'
    },
    question: 'If a node in a BST has a non-empty right subtree, where is its in-order successor located?',
    options: [
      'The right child itself',
      'The leftmost (minimum) node in its right subtree',
      'The root of the tree',
      'The parent node'
    ],
    correctAnswer: 1,
    explanation: 'In-order traversal visits Left, Root, Right. The next key immediately greater than current node X must be the smallest value in X\'s right subtree, found by going to `right` then following `left` pointers to the end.',
    timeComplexity: 'O(H)',
    spaceComplexity: 'O(1)',
    conceptTag: 'In-Order Successor'
  },
  {
    id: 'tree_7',
    topic: 'trees',
    difficulty: 'medium',
    level: 2,
    title: 'Tree Height vs Depth Distinction',
    question: 'What is the standard computer science definition of the Height of a node in a tree?',
    options: [
      'The number of edges on the longest downward path from that node to a leaf',
      'The number of edges from the root to that node',
      'The total number of children belonging to that node',
      'The total number of leaves in the whole tree'
    ],
    correctAnswer: 0,
    explanation: 'Depth is distance downward from the root to the node. Height is distance downward from the node to its furthest descendant leaf.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Tree Definitions'
  },
  {
    id: 'tree_8',
    topic: 'trees',
    difficulty: 'medium',
    level: 2,
    title: 'Tree Diameter Definition',
    question: 'What is the diameter (or width) of a binary tree?',
    options: [
      'The maximum number of nodes on any single level',
      'The length of the longest path between ANY two nodes in the tree (which may or may not pass through root)',
      'The height of the left subtree minus height of right subtree',
      'The total count of leaf nodes'
    ],
    correctAnswer: 1,
    explanation: 'Tree diameter is defined as the maximum path length between any two arbitrary nodes. The longest path can pass through root or be entirely contained within one deep subtree.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    conceptTag: 'Tree Diameter'
  },
  {
    id: 'tree_9',
    topic: 'trees',
    difficulty: 'hard',
    level: 3,
    title: 'AVL Tree Balance Factor Invariant',
    question: 'What are the permissible balance factor values `height(left) - height(right)` for every node in an AVL tree?',
    options: [
      '0 only',
      '-1, 0, or +1',
      '-2, -1, 0, 1, or 2',
      'Any positive integer'
    ],
    correctAnswer: 1,
    explanation: 'An AVL tree strictly requires that the heights of the two child subtrees of any node differ by at most 1 (i.e. Balance Factor ∈ {-1, 0, +1}). Any insertion or deletion causing ±2 triggers rebalancing rotations.',
    timeComplexity: 'O(1) check',
    spaceComplexity: 'O(1)',
    conceptTag: 'AVL Balance Factor'
  },
  {
    id: 'tree_10',
    topic: 'trees',
    difficulty: 'hard',
    level: 3,
    title: 'Lowest Common Ancestor (LCA) in BST',
    codeSnippet: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (p->val < root->val && q->val < root->val)
        return lowestCommonAncestor(root->left, p, q);
    if (p->val > root->val && q->val > root->val)
        return lowestCommonAncestor(root->right, p, q);
    return root;
}`,
    question: 'Why does the condition `p->val < root->val && q->val < root->val` guarantee that LCA is in the left subtree?',
    options: [
      'Because both nodes p and q are strictly smaller than root, so both must reside exclusively in root->left',
      'Because LCA is always the left child',
      'Because p is always greater than q',
      'Because all BST nodes are positive'
    ],
    correctAnswer: 0,
    explanation: 'By the BST invariant, all nodes smaller than root lie in the left subtree. If both p and q are smaller than root, their lowest common ancestor must also be in the left subtree. The split point where p and q diverge is their LCA.',
    timeComplexity: 'O(H)',
    spaceComplexity: 'O(H) recursion',
    conceptTag: 'LCA in BST'
  },
  {
    id: 'tree_11',
    topic: 'trees',
    difficulty: 'hard',
    level: 3,
    title: 'Construct Tree from Preorder & Inorder',
    question: 'Why is it impossible to uniquely reconstruct an arbitrary binary tree given ONLY Pre-order and Post-order traversals (without BST properties or full-tree constraints)?',
    options: [
      'Because pre-order and post-order traverse nodes at identical speeds',
      'Because you cannot distinguish whether a single child is a left child or a right child',
      'Because post-order discards root information',
      'Because trees require at least 3 traversals to reconstruct'
    ],
    correctAnswer: 1,
    explanation: 'When a node has only one child, in both pre-order and post-order traversals that child appears in identical relative sequence whether it is placed on the left or the right. In-order traversal is required to disambiguate side.',
    timeComplexity: 'N/A',
    spaceComplexity: 'N/A',
    conceptTag: 'Tree Reconstruction'
  },
  {
    id: 'tree_12',
    topic: 'trees',
    difficulty: 'hard',
    level: 3,
    title: 'Trie (Prefix Tree) Word Search',
    question: 'What is the time complexity to search for a word of length L in a Trie containing N words with alphabet size Σ?',
    options: [
      'O(N * L)',
      'O(L)',
      'O(log N)',
      'O(Σ * N)'
    ],
    correctAnswer: 1,
    explanation: 'In a Trie, each step matches one character of the word by jumping to the corresponding child pointer in O(1). Thus, searching for a word of length L takes O(L) time, completely independent of the total number of words N in the dataset!',
    timeComplexity: 'O(L)',
    spaceComplexity: 'O(1) per lookup',
    conceptTag: 'Trie Data Structure'
  },
  {
    id: 'tree_13',
    topic: 'trees',
    difficulty: 'master',
    level: 4,
    title: 'Morris In-Order Traversal Space Complexity',
    question: 'How does Morris In-Order Traversal achieve O(N) time traversal with strictly O(1) auxiliary space (without recursion stack or queue)?',
    options: [
      'By converting tree nodes into an array beforehand',
      'By creating temporary threaded pointers from the rightmost node of the left subtree back to the current node',
      'By storing parent pointers inside node keys',
      'By using XOR pointer arithmetic'
    ],
    correctAnswer: 1,
    explanation: 'Morris traversal temporarily modifies tree pointers: it finds the in-order predecessor (rightmost node in left subtree) and makes its right pointer point to `curr` (threaded tree). When returning, it breaks the thread, restoring original structure.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) Auxiliary',
    conceptTag: 'Morris Traversal'
  },
  {
    id: 'tree_14',
    topic: 'trees',
    difficulty: 'master',
    level: 4,
    title: 'Red-Black Tree Invariants',
    question: 'Which of the following is a MANDATORY property of a Red-Black Tree?',
    options: [
      'Every node must have balance factor between -1 and +1',
      'Every path from a node to any of its descendant NIL leaves contains the exact same number of black nodes (Black-Height property)',
      'The root node must always be colored Red',
      'A Red node must always have two Red children'
    ],
    correctAnswer: 1,
    explanation: 'Property 5 of Red-Black trees states: for each node, all simple paths from the node to descendant leaves contain the same number of black nodes. Also, no two red nodes can be adjacent, ensuring maximum height $\\le 2 \\log_2(N+1)$.',
    timeComplexity: 'O(log N) worst search',
    spaceComplexity: '1 bit color per node',
    conceptTag: 'Red-Black Properties'
  },
  {
    id: 'tree_15',
    topic: 'trees',
    difficulty: 'master',
    level: 4,
    title: 'Segment Tree Range Update Lazy Propagation',
    question: 'What is the purpose of "Lazy Propagation" in a Segment Tree?',
    options: [
      'To reduce segment tree memory by 50%',
      'To postpone updates to child segments until those nodes are actually queried, achieving O(log N) range updates instead of O(N)',
      'To convert the segment tree into a binary search tree',
      'To balance the segment tree after node deletion'
    ],
    correctAnswer: 1,
    explanation: 'Without lazy propagation, updating a range of size K requires visiting and updating all descendants, costing O(K) = O(N). Lazy propagation stores pending delta updates in parent nodes and pushes down on demand in O(log N).',
    timeComplexity: 'O(log N) range update',
    spaceComplexity: 'O(N)',
    conceptTag: 'Segment Trees'
  },
  {
    id: 'tree_16',
    topic: 'trees',
    difficulty: 'master',
    level: 4,
    title: 'Fenwick Tree (Binary Indexed Tree) Indexing',
    question: 'In a Fenwick Tree (BIT), what bitwise operation isolates the lowest set bit (LSB) of integer `i` to determine parent and range coverage?',
    options: [
      'i & (-i)',
      'i ^ (i >> 1)',
      '~i & i',
      'i | (i + 1)'
    ],
    correctAnswer: 0,
    explanation: 'In two’s complement arithmetic, `-i = (~i + 1)`. Computing `i & (-i)` isolates the lowest 1-bit of `i`, which is the exact interval length managed by index `i` in a Fenwick tree.',
    timeComplexity: 'O(1) bitwise',
    spaceComplexity: 'O(1)',
    conceptTag: 'Fenwick Tree Bitwise'
  },

  // ==========================================
  // STACKS & QUEUES (16 Questions: L1 to L4)
  // ==========================================
  {
    id: 'sq_1',
    topic: 'stacks_queues',
    difficulty: 'easy',
    level: 1,
    title: 'Core Operating Principles',
    question: 'Which acronyms define the operational principles of a Stack and a standard Queue respectively?',
    options: [
      'Stack: FIFO, Queue: LIFO',
      'Stack: LIFO (Last-In-First-Out), Queue: FIFO (First-In-First-Out)',
      'Stack: FILO, Queue: FILO',
      'Both are FIFO'
    ],
    correctAnswer: 1,
    explanation: 'A Stack is Last-In-First-Out (LIFO) like a stack of plates. A Queue is First-In-First-Out (FIFO) like a line of people waiting at a ticket counter.',
    timeComplexity: 'O(1) push/pop',
    spaceComplexity: 'O(N)',
    conceptTag: 'LIFO & FIFO'
  },
  {
    id: 'sq_2',
    topic: 'stacks_queues',
    difficulty: 'easy',
    level: 1,
    title: 'Parentheses Matching Stack',
    question: 'When validating matched brackets like `"({[]})"`, what action is taken when an opening bracket is encountered?',
    options: [
      'Pop from stack and check match',
      'Push the opening bracket onto the stack',
      'Clear the stack immediately',
      'Reverse the input string'
    ],
    correctAnswer: 1,
    explanation: 'Opening brackets `(`, `{`, `[` are pushed onto the stack. When a closing bracket is encountered, the top of the stack is inspected: if it matches the corresponding opening bracket, it is popped; otherwise invalid.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Stack Application'
  },
  {
    id: 'sq_3',
    topic: 'stacks_queues',
    difficulty: 'easy',
    level: 1,
    title: 'Queue Using Two Stacks Complexity',
    question: 'When implementing a FIFO Queue using two LIFO Stacks (`inStack` and `outStack`), what is the amortized time complexity of each `dequeue()` operation?',
    options: [
      'O(N^2)',
      'O(N) worst-case, O(1) amortized',
      'O(log N)',
      'Strictly O(N) always'
    ],
    correctAnswer: 1,
    explanation: 'Whenever `outStack` is empty, all elements from `inStack` are transferred (costing O(N)). However, each element is pushed and popped from `inStack` once and `outStack` once throughout its lifetime, yielding O(1) amortized cost.',
    timeComplexity: 'Amortized O(1)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Two Stacks Queue'
  },
  {
    id: 'sq_4',
    topic: 'stacks_queues',
    difficulty: 'easy',
    level: 1,
    title: 'Circular Queue Full Condition',
    question: 'In an array-based Circular Queue of capacity `SIZE` with `front` and `rear` pointers, how is the queue FULL condition detected (leaving 1 slot empty to disambiguate from empty queue)?',
    options: [
      '(rear + 1) % SIZE == front',
      'front == rear',
      'rear == SIZE - 1',
      'front + rear == SIZE'
    ],
    correctAnswer: 0,
    explanation: 'If `(rear + 1) % SIZE == front`, advancing `rear` would collide with `front`. This leaves one sentinel slot empty, cleanly distinguishing FULL from EMPTY (`front == rear`).',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Circular Queue'
  },
  {
    id: 'sq_5',
    topic: 'stacks_queues',
    difficulty: 'medium',
    level: 2,
    title: 'Postfix Expression Evaluation',
    question: 'Given the postfix (Reverse Polish) expression `["2", "3", "4", "*", "+"]`, what is the resulting evaluated value?',
    options: [
      '20',
      '14',
      '24',
      '9'
    ],
    correctAnswer: 1,
    explanation: '1. Push 2, 3, 4. 2. See `*`: pop 4 and 3, compute `3 * 4 = 12`, push 12. 3. See `+`: pop 12 and 2, compute `2 + 12 = 14`, push 14. Result = 14.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    conceptTag: 'RPN Expression'
  },
  {
    id: 'sq_6',
    topic: 'stacks_queues',
    difficulty: 'medium',
    level: 2,
    title: 'Min Stack Design with O(1) getMin()',
    question: 'How can a Min Stack support `push()`, `pop()`, and `getMin()` all in strictly O(1) time without compromising space complexity?',
    options: [
      'Sort the stack after every push',
      'Store pairs `(value, minSoFar)` or maintain an auxiliary stack of running minimums',
      'Use a binary search tree on every pop',
      'Scan the stack from top to bottom on each getMin()'
    ],
    correctAnswer: 1,
    explanation: 'By pairing each value with the minimum seen up to that point, or pushing onto a secondary `minStack` only when the new element is $\\le$ current minimum, `getMin()` is a simple O(1) peek at the top.',
    timeComplexity: 'O(1) all ops',
    spaceComplexity: 'O(N)',
    conceptTag: 'Min Stack'
  },
  {
    id: 'sq_7',
    topic: 'stacks_queues',
    difficulty: 'medium',
    level: 2,
    title: 'Deque (Double-Ended Queue) Operations',
    question: 'Which operations are supported by a Double-Ended Queue (Deque) in O(1) time?',
    options: [
      'Insert/Delete at front only',
      'Insert/Delete at rear only',
      'Insert/Delete at both front and rear',
      'Insert at front, Delete only in the middle'
    ],
    correctAnswer: 2,
    explanation: 'A Deque generalizes both stacks and queues, providing `push_front()`, `push_back()`, `pop_front()`, and `pop_back()` in O(1) time.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Deque Fundamentals'
  },
  {
    id: 'sq_8',
    topic: 'stacks_queues',
    difficulty: 'medium',
    level: 2,
    title: 'Monotonic Stack Concept',
    question: 'What is a "Monotonic Increasing Stack"?',
    options: [
      'A stack that dynamically increases its capacity by 2x when full',
      'A stack where elements from bottom to top are strictly in monotonically increasing order',
      'A stack that only allows positive integers',
      'A stack where push operations take increasing time'
    ],
    correctAnswer: 1,
    explanation: 'In a monotonic increasing stack, elements are maintained in increasing order. Before pushing X, any elements on top greater than X are popped out. It solves "Next Greater Element" problems in linear time.',
    timeComplexity: 'O(N) overall',
    spaceComplexity: 'O(N)',
    conceptTag: 'Monotonic Stack'
  },
  {
    id: 'sq_9',
    topic: 'stacks_queues',
    difficulty: 'hard',
    level: 3,
    title: 'Daily Temperatures / Next Greater Element',
    question: 'For an array of temperatures `[73, 74, 75, 71, 69, 72, 76, 73]`, what is the time complexity to find the number of days until a warmer temperature using a monotonic stack?',
    options: [
      'O(N^2)',
      'O(N log N)',
      'O(N)',
      'O(N * W) where W is max temperature'
    ],
    correctAnswer: 2,
    explanation: 'Using a monotonic decreasing stack of indices, each day index is pushed at most once and popped at most once when a warmer day is encountered. Total operations $\\le 2N$, resulting in linear O(N) runtime.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Next Greater Element'
  },
  {
    id: 'sq_10',
    topic: 'stacks_queues',
    difficulty: 'hard',
    level: 3,
    title: 'Largest Rectangle in Histogram',
    visualDiagram: {
      type: 'stack',
      content: 'Heights: [2, 1, 5, 6, 2, 3]\nStack stores indices of increasing bar heights.\nWhen a shorter bar arrives, pop and calculate rectangle width!'
    },
    question: 'In the classic O(N) monotonic stack solution for Largest Rectangle in Histogram, how is the width of the popped bar calculated?',
    options: [
      'width = current_index - stack.top() - 1',
      'width = current_index + 1',
      'width = stack.size()',
      'width = heights[current_index]'
    ],
    correctAnswer: 0,
    explanation: 'The popped bar is bounded on the right by `current_index` (first bar to the right shorter than it) and on the left by the new `stack.top()` (first bar to the left shorter than it). Thus `width = i - stack.top() - 1`.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Histogram Stack'
  },
  {
    id: 'sq_11',
    topic: 'stacks_queues',
    difficulty: 'hard',
    level: 3,
    title: 'Infix to Postfix Shunting-Yard Algorithm',
    question: 'In Edsger Dijkstra’s Shunting-Yard algorithm for converting infix `A + B * C` to postfix, what happens when the `*` operator is read while `+` is on the operator stack?',
    options: [
      '`+` is popped immediately because it arrived first',
      '`*` has higher operator precedence than `+`, so `*` is pushed directly onto the stack',
      'The expression is declared invalid',
      'Both operators are popped and combined'
    ],
    correctAnswer: 1,
    explanation: 'An incoming operator is pushed onto the stack if it has higher precedence than the operator at the top of the stack. Since `*` has higher precedence than `+`, `*` is pushed on top of `+`.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Shunting-Yard'
  },
  {
    id: 'sq_12',
    topic: 'stacks_queues',
    difficulty: 'hard',
    level: 3,
    title: 'Trapping Rain Water (Stack Approach)',
    question: 'When using a monotonic decreasing stack to solve Trapping Rain Water, what geometric entity is bounded each time a bottom element is popped?',
    options: [
      'A vertical column of water',
      'A horizontal bounded layer (basin) of water between the popped bottom, the current wall, and the left boundary wall',
      'A diagonal watershed',
      'A circle inscribed in the canyon'
    ],
    correctAnswer: 1,
    explanation: 'The stack approach calculates trapped water horizontally layer by layer: bounded height = `min(height[left], height[right]) - height[bottom]`, and distance = `right - left - 1`.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Trapping Rain Water'
  },
  {
    id: 'sq_13',
    topic: 'stacks_queues',
    difficulty: 'master',
    level: 4,
    title: 'Lock-Free Concurrent Queue (Michael-Scott)',
    question: 'What atomic hardware instruction is the cornerstone of the Michael-Scott lock-free queue algorithm in concurrent systems?',
    options: [
      'CAS (Compare-And-Swap / CMPXCHG)',
      'Memory fence / MFENCE only',
      'Test-And-Set latch',
      'Hardware interrupt mask'
    ],
    correctAnswer: 0,
    explanation: 'The Michael-Scott concurrent queue uses atomic Compare-And-Swap (CAS) to update the `tail->next` pointer and then swing the `tail` pointer forward without requiring any mutual exclusion mutex locks.',
    timeComplexity: 'O(1) lock-free step',
    spaceComplexity: 'O(N)',
    conceptTag: 'Lock-Free Queues'
  },
  {
    id: 'sq_14',
    topic: 'stacks_queues',
    difficulty: 'master',
    level: 4,
    title: 'Call Stack vs Heap Memory Allocation',
    question: 'Why is stack frame memory allocation (for local function variables) orders of magnitude faster than heap allocation (`malloc` / `new`)?',
    options: [
      'Stack frames are stored on CPU registers only',
      'Stack allocation simply increments or decrements the CPU stack pointer register (RSP), requiring no memory fragmentation search or locks',
      'Heap memory requires an internet handshake',
      'Stack variables are never cleared from RAM'
    ],
    correctAnswer: 1,
    explanation: 'A function stack frame is allocated by a single CPU instruction (e.g. `sub rsp, 64`). In contrast, heap allocators must search free lists/arenas, handle fragmentation, manage page boundaries, and synchronize thread safety.',
    timeComplexity: '1 CPU cycle',
    spaceComplexity: 'Fixed Stack Size',
    conceptTag: 'Call Stack Architecture'
  },
  {
    id: 'sq_15',
    topic: 'stacks_queues',
    difficulty: 'master',
    level: 4,
    title: '132 Pattern via Monotonic Stack',
    question: 'In finding a "132 pattern" (`nums[i] < nums[k] < nums[j]` with `i < j < k`), how does iterating backwards from right to left with a stack find the solution in O(N)?',
    options: [
      'Stack maintains potential values for "3", while tracking the maximum valid "2" popped; if any incoming element is < "2", pattern is found',
      'Sorts the array and takes three smallest items',
      'Checks all triplets in O(N^3)',
      'Constructs a binary tree of suffixes'
    ],
    correctAnswer: 0,
    explanation: 'Scanning from right-to-left: the monotonic decreasing stack stores candidates for the peak value "3". When an element is larger than top, it is a valid "3", popping elements into `third` (the value "2"). Any subsequent number smaller than `third` satisfies 1 < 2 < 3!',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    conceptTag: '132 Pattern'
  },
  {
    id: 'sq_16',
    topic: 'stacks_queues',
    difficulty: 'master',
    level: 4,
    title: 'Sliding Window Median via Two Heaps',
    question: 'To find the continuous median of a sliding window in O(log K) per slide, which combination of data structures is optimal?',
    options: [
      'Two stacks',
      'Max-heap for lower half and Min-heap for upper half (with hash map for lazy deletion of out-of-window elements)',
      'Two circular queues',
      'A single singly linked list'
    ],
    correctAnswer: 1,
    explanation: 'Balancing a Max-Heap for the smaller half and Min-Heap for the larger half gives immediate O(1) median access and O(log K) insertion. Out-of-window elements are marked lazily in a hash map and popped when hitting top.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    conceptTag: 'Two Heaps Median'
  },

  // ==========================================
  // SPECIAL GAUNTLET ROUND (20 Questions: Mixed & Boss Level)
  // ==========================================
  {
    id: 'boss_1',
    topic: 'special_round',
    difficulty: 'easy',
    level: 1,
    title: 'Binary Heap Array Representation',
    visualDiagram: {
      type: 'tree',
      content: 'Array: [10, 20, 30, 40, 50]\nRoot = index 0\nLeft child of index i = 2*i + 1\nRight child of index i = 2*i + 2'
    },
    question: 'For a 0-indexed array representing a complete binary heap, what is the formula to find the parent of the node at index `i`?',
    options: [
      '⌊(i - 1) / 2⌋',
      '⌊i / 2⌋',
      '2 * i - 1',
      'i - 2'
    ],
    correctAnswer: 0,
    explanation: 'In 0-indexed binary heaps: left child is at `2i + 1`, right child at `2i + 2`. The parent index of any node `i` is given by `floor((i - 1) / 2)`.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    conceptTag: 'Binary Heap Formula'
  },
  {
    id: 'boss_2',
    topic: 'special_round',
    difficulty: 'easy',
    level: 1,
    title: 'Hash Table Collision Resolution',
    question: 'What is the worst-case lookup time in a Hash Table when all N keys collide into the exact same bucket under separate chaining (using simple linked lists)?',
    options: [
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(N^2)'
    ],
    correctAnswer: 2,
    explanation: 'If all keys hash to the same bucket index, they form a single long linked list of length N. Searching for a key requires traversing this list, degrading to linear O(N) worst-case time.',
    timeComplexity: 'Worst O(N), Average O(1)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Hash Collisions'
  },
  {
    id: 'boss_3',
    topic: 'special_round',
    difficulty: 'medium',
    level: 2,
    title: 'Build-Heap Time Complexity',
    question: 'What is the time complexity to build a binary heap from an arbitrary unsorted array of N elements using Floyd’s bottom-up `siftDown()` algorithm?',
    options: [
      'O(N log N)',
      'O(N)',
      'O(N^2)',
      'O(log N)'
    ],
    correctAnswer: 1,
    explanation: 'Although top-down insertion takes O(N log N), Floyd’s bottom-up `buildHeap` processes nodes bottom-up. Because most nodes reside near leaves with tiny heights, the sum $\\sum_{h=0}^{\\log N} \\frac{N}{2^{h+1}} O(h)$ mathematically converges to O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) in-place',
    conceptTag: 'Floyd Build Heap'
  },
  {
    id: 'boss_4',
    topic: 'special_round',
    difficulty: 'medium',
    level: 2,
    title: 'Disjoint Set Union (Union-Find) with Path Compression',
    question: 'With both Path Compression and Union by Rank enabled, what is the nearly constant amortized time complexity per find/union operation for N elements?',
    options: [
      'O(log N)',
      'O(α(N)) — Inverse Ackermann function',
      'O(1) strictly deterministic',
      'O(N)'
    ],
    correctAnswer: 1,
    explanation: 'Tarjan proved that Union-Find with path compression and rank heuristic has amortized complexity O(α(N)) per operation, where α is the inverse Ackermann function. For any input up to the number of atoms in the universe, α(N) < 5.',
    timeComplexity: 'O(α(N)) ≈ O(1)',
    spaceComplexity: 'O(N)',
    conceptTag: 'Disjoint Set Union'
  },
  {
    id: 'boss_5',
    topic: 'special_round',
    difficulty: 'medium',
    level: 2,
    title: 'Graph Representation Trade-Off',
    question: 'For a sparse graph with V vertices and E edges where E << V^2, why is an Adjacency List preferred over an Adjacency Matrix?',
    options: [
      'Adjacency List requires O(V + E) space, whereas Adjacency Matrix demands O(V^2) space regardless of edges',
      'Adjacency List allows O(1) edge lookup between any two arbitrary vertices',
      'Adjacency Matrices cannot represent directed edges',
      'Adjacency Lists can only be processed on multi-core processors'
    ],
    correctAnswer: 0,
    explanation: 'An Adjacency Matrix allocates a full V x V table (O(V^2)), which wastes massive memory for sparse graphs. An Adjacency List stores only actual edges, taking O(V + E) space and allowing O(degree) neighbor exploration.',
    timeComplexity: 'Space O(V + E)',
    spaceComplexity: 'O(V + E)',
    conceptTag: 'Graph Representations'
  },
  {
    id: 'boss_6',
    topic: 'special_round',
    difficulty: 'medium',
    level: 2,
    title: 'Dijkstra Algorithm with Min-Heap',
    question: 'What is the time complexity of Dijkstra’s single-source shortest path algorithm on a graph with V vertices and E edges when implemented with a binary min-heap priority queue?',
    options: [
      'O(V^2)',
      'O((V + E) log V)',
      'O(V * E)',
      'O(E log E + V^2)'
    ],
    correctAnswer: 1,
    explanation: 'Each vertex is extracted from the min-heap at most once (V * log V), and each edge may trigger a distance relaxation decreasing key in the heap (E * log V). Total runtime is O((V + E) log V).',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    conceptTag: 'Dijkstra Complexity'
  },
  {
    id: 'boss_7',
    topic: 'special_round',
    difficulty: 'hard',
    level: 3,
    title: 'Topological Sort Invariant',
    question: 'What condition MUST a graph satisfy in order for a valid Topological Sort to exist?',
    options: [
      'It must be an undirected tree',
      'It must be a Directed Acyclic Graph (DAG)',
      'It must be strongly connected',
      'Every vertex must have even degree'
    ],
    correctAnswer: 1,
    explanation: 'Topological sorting linearizes vertices such that for every directed edge u -> v, u appears before v. If any cycle exists (e.g. A -> B -> C -> A), no linear ordering can satisfy all dependencies simultaneously.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    conceptTag: 'Topological Sorting'
  },
  {
    id: 'boss_8',
    topic: 'special_round',
    difficulty: 'hard',
    level: 3,
    title: 'B-Tree Disk I/O Optimization',
    question: 'Why do database storage engines (like PostgreSQL, MySQL InnoDB) use B-Trees or B+Trees with wide fan-outs (e.g. hundreds of keys per node) instead of AVL or Red-Black trees?',
    options: [
      'B-Trees use less CPU arithmetic',
      'High fan-out minimizes tree height, dramatically reducing the number of slow disk/SSD block reads per query',
      'Red-Black trees cannot store string keys',
      'B-Trees prevent database deadlocks'
    ],
    correctAnswer: 1,
    explanation: 'Disk I/O is hundreds of thousands of times slower than RAM. By setting B-Tree node size to match physical disk block/page size (e.g. 4KB-16KB), a node holds hundreds of keys. A 3-level B-Tree can index billions of rows with only 3 disk accesses!',
    timeComplexity: 'O(log_B N) disk reads',
    spaceComplexity: 'O(N)',
    conceptTag: 'B-Tree Disk Access'
  },
  {
    id: 'boss_9',
    topic: 'special_round',
    difficulty: 'hard',
    level: 3,
    title: 'Bloom Filter False Positives vs Negatives',
    question: 'Which of the following statements about a standard Bloom Filter is mathematically true?',
    options: [
      'It can return False Negatives, but never False Positives',
      'It can return False Positives, but NEVER False Negatives (if it says an element is absent, it is 100% absent)',
      'It allows deleting elements in O(1) without side effects',
      'It stores exact cryptographic hashes of all inserted keys'
    ],
    correctAnswer: 1,
    explanation: 'A Bloom filter uses a bit array and k hash functions. If any corresponding bit is 0, the item was definitely never inserted (0% false negatives). If all bits are 1, bits may have been set by other elements, introducing a non-zero false positive probability.',
    timeComplexity: 'O(k) hash ops',
    spaceComplexity: 'O(M) bits',
    conceptTag: 'Probabilistic Data Structures'
  },
  {
    id: 'boss_10',
    topic: 'special_round',
    difficulty: 'hard',
    level: 3,
    title: 'LRU vs LFU Cache Trade-Off',
    question: 'Under what specific access pattern does an LRU (Least Recently Used) cache perform poorly compared to an LFU (Least Frequently Used) cache?',
    options: [
      'Sequential one-pass scanning through a huge dataset larger than cache capacity (Looping/Scan Resistance problem)',
      'Repeatedly accessing the exact same single key',
      'When cache capacity is infinity',
      'When all keys are numeric integers'
    ],
    correctAnswer: 0,
    explanation: 'When a sequential scan (like a database backup or full table scan) touches many keys once, LRU evicts all hot, frequently accessed items to make room for cold keys that will never be read again.',
    timeComplexity: 'O(1) get/put',
    spaceComplexity: 'O(Capacity)',
    conceptTag: 'Cache Invariants'
  },
  {
    id: 'boss_11',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Fibonacci Heap Decrease-Key Complexity',
    question: 'Why are Fibonacci Heaps theoretically prized for Dijkstra’s and Prim’s algorithms, and what is the amortized complexity of `decreaseKey()`?',
    options: [
      'Amortized O(1) for `decreaseKey()`, reducing Dijkstra to O(E + V log V)',
      'O(log log N) for `deleteMin()`',
      'They do not use heap nodes',
      'Strictly O(1) worst-case without amortized pooling'
    ],
    correctAnswer: 0,
    explanation: 'Fibonacci heaps delay tree consolidation until `deleteMin()`. Operations like `insert()` and `decreaseKey()` perform lazy cuts and cascading cuts in amortized O(1) time, accelerating dense graph shortest paths to O(E + V log V).',
    timeComplexity: 'Amortized O(1) decreaseKey',
    spaceComplexity: 'O(V)',
    conceptTag: 'Fibonacci Heap'
  },
  {
    id: 'boss_12',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Aho-Corasick Automaton',
    question: 'The Aho-Corasick string matching algorithm combines a Trie with which theoretical construct to find all dictionary patterns in text in O(N + M + Matches)?',
    options: [
      'Suffix array binary search',
      'KMP-style failure / fallback links between trie nodes',
      'Fourier transform multiplication',
      'Disjoint Set union rank'
    ],
    correctAnswer: 1,
    explanation: 'Aho-Corasick builds failure links across the Trie via BFS, similar to the KMP pi-table. When a character mismatch occurs, it follows the failure transition to the longest valid proper suffix branch without backtracking text.',
    timeComplexity: 'O(Text Length + Matches)',
    spaceComplexity: 'O(Dictionary Size)',
    conceptTag: 'Aho-Corasick'
  },
  {
    id: 'boss_13',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Tarjan’s Strongly Connected Components (SCC)',
    question: 'In Tarjan’s linear O(V + E) SCC algorithm on directed graphs, what does the `lowlink[u]` value computed during DFS represent?',
    options: [
      'The number of outgoing edges from node u',
      'The smallest DFS discovery time of any node reachable from u (including u) through u’s subtree and at most one back-edge',
      'The shortest physical distance to the root node',
      'The parent node index in the recursion stack'
    ],
    correctAnswer: 1,
    explanation: '`lowlink[u]` tracks the earliest ancestor node in the DFS tree reachable from u. When DFS finishes exploring u and `lowlink[u] == disc[u]`, node u is the root of an entire strongly connected component, popped from stack in O(1).',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    conceptTag: 'Tarjan SCC'
  },
  {
    id: 'boss_14',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Suffix Automaton vs Suffix Tree',
    question: 'What is the primary structural advantage of a Suffix Automaton (Directed Acyclic Word Graph) over a standard Suffix Tree for a string of length N?',
    options: [
      'A Suffix Automaton represents all distinct substrings with at most 2N - 1 states and 3N - 4 transitions, often using significantly less memory with minimal pointer overhead',
      'Suffix Automatons can only be constructed in O(N^3) time',
      'Suffix Trees do not support online linear construction',
      'Suffix Automatons cannot search for substrings'
    ],
    correctAnswer: 0,
    explanation: 'A Suffix Automaton is the minimal DFA recognizing all suffixes. It achieves linear O(N) states (at most 2N-1) and transitions (at most 3N-4) with high constant factor efficiency compared to complex Ukkonen Suffix Trees.',
    timeComplexity: 'O(N) online construction',
    spaceComplexity: 'O(N) states & transitions',
    conceptTag: 'Suffix Automaton'
  },
  {
    id: 'boss_15',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Treap (Tree + Heap) Randomization Invariant',
    question: 'In a Treap data structure, how are the Node Key and Node Priority fields maintained respectively?',
    options: [
      'Keys satisfy Binary Search Tree invariant; Priorities satisfy Max-Heap invariant',
      'Keys satisfy Max-Heap invariant; Priorities satisfy Queue FIFO',
      'Both keys and priorities must satisfy BST invariants',
      'Priorities are strictly alphabetical'
    ],
    correctAnswer: 0,
    explanation: 'A Treap assigns each node a random priority. Node keys satisfy BST ordering (left < root < right), while random priorities satisfy heap ordering (parent priority > children priorities). This probabilistically guarantees O(log N) expected tree height!',
    timeComplexity: 'O(log N) expected',
    spaceComplexity: 'O(N)',
    conceptTag: 'Treap Invariant'
  },
  {
    id: 'boss_16',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Cache-Oblivious B-Tree (van Emde Boas Layout)',
    question: 'What makes the van Emde Boas recursive layout of a static binary search tree "Cache-Oblivious"?',
    options: [
      'It requires explicit knowledge of CPU L1, L2, and L3 cache line sizes B',
      'It recursively splits the tree at height H/2 and lays out subtrees contiguously in memory, achieving optimal O(log_B N) cache transfers at EVERY level of the memory hierarchy without tuning any hardware parameter B',
      'It stores all data directly in GPU VRAM',
      'It disables CPU hardware caching'
    ],
    correctAnswer: 1,
    explanation: 'Cache-oblivious algorithms achieve asymptotically optimal cache miss rates across all cache levels (L1, L2, L3, RAM, Disk) simultaneously without needing any cache block size parameter B embedded in source code.',
    timeComplexity: 'O(log_B N) memory transfers',
    spaceComplexity: 'O(N)',
    conceptTag: 'Cache-Oblivious Algorithms'
  },
  {
    id: 'boss_17',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Heavy-Light Decomposition (HLD) on Trees',
    question: 'When decomposing a tree of N nodes into heavy and light paths for range queries with a segment tree, how many distinct heavy paths does any simple path between two nodes cross at most?',
    options: [
      'At most O(log N) heavy path transitions',
      'O(N) transitions',
      'Exactly 1 transition always',
      'O(N^(1/2)) transitions'
    ],
    correctAnswer: 0,
    explanation: 'A light edge leads to a child subtree of size $\\le$ half the parent subtree. Therefore, moving up the tree via light edges halves the component size, meaning any path between two nodes traverses at most O(log N) light edges and O(log N) heavy paths.',
    timeComplexity: 'O(log^2 N) path query',
    spaceComplexity: 'O(N)',
    conceptTag: 'Heavy-Light Decomposition'
  },
  {
    id: 'boss_18',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Cuckoo Hashing Worst-Case Lookup',
    question: 'What is the absolute worst-case lookup time in a Cuckoo Hash Table with two independent hash tables T1 and T2 and hash functions h1 and h2?',
    options: [
      'O(1) worst-case (at most 2 table lookups: T1[h1(x)] or T2[h2(x)])',
      'O(N) worst-case',
      'O(log N) worst-case',
      'O(N^2)'
    ],
    correctAnswer: 0,
    explanation: 'In Cuckoo Hashing, a key x can ONLY reside in either index `h1(x)` in table 1 or `h2(x)` in table 2. Thus, looking up or deleting a key checks at most 2 memory locations, guaranteeing strict O(1) worst-case lookup time!',
    timeComplexity: 'Strict O(1) worst-case lookup',
    spaceComplexity: 'O(N)',
    conceptTag: 'Cuckoo Hashing'
  },
  {
    id: 'boss_19',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'Persistent Data Structures (Node Copying)',
    question: 'In a fully persistent balanced binary search tree, what is the time and space complexity of inserting a key while keeping all previous versions immutable and queryable?',
    options: [
      'O(N) time and O(N) space',
      'O(log N) time and O(log N) space via path copying',
      'O(1) time and O(N^2) space',
      'O(log N) time and O(1) space'
    ],
    correctAnswer: 1,
    explanation: 'Path copying clones only the nodes along the search path from root down to the insertion point (O(log N) nodes). Unmodified subtrees are shared by reference with previous versions, preserving history in O(log N) space per modification.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(log N) new nodes',
    conceptTag: 'Persistent Trees'
  },
  {
    id: 'boss_20',
    topic: 'special_round',
    difficulty: 'master',
    level: 4,
    title: 'HyperLogLog Cardinality Estimation',
    question: 'HyperLogLog estimates the number of unique elements in massive data streams (billions of items) using only ~1.5 KB of memory. What fundamental statistical phenomenon does it observe?',
    options: [
      'The position of the leftmost (leading) 1-bit in uniformly distributed hash values of the stream items',
      'The prime factorization of item IDs',
      'The execution time of CPU clock cycles',
      'The frequency of collisions in MD5'
    ],
    correctAnswer: 0,
    explanation: 'If a 64-bit hash function uniformly distributes items, observing a leading run of k zeros occurs with probability 2^(-k). HyperLogLog averages these maximum run observations across registers with harmonic mean, estimating cardinality with ~1% error using minuscule memory.',
    timeComplexity: 'O(1) per stream item',
    spaceComplexity: 'O(log log N) bits',
    conceptTag: 'HyperLogLog'
  }
];

export function getQuestionsForGame(topicId: TopicId): Question[] {
  if (topicId === 'special_round') {
    // Gauntlet: Starts with mixture of questions, ordered by ascending level (1 -> 2 -> 3 -> 4)
    // and randomly shuffled within each level tier
    const gauntletSpecific = ALL_QUESTIONS.filter(q => q.topic === 'special_round');
    const otherTopics = ALL_QUESTIONS.filter(q => q.topic !== 'special_round');
    
    // Combine and group by level
    const pool = [...gauntletSpecific, ...otherTopics];
    return sortAndShuffleByDifficulty(pool);
  }

  // Topic specific campaign
  const topicQuestions = ALL_QUESTIONS.filter(q => q.topic === topicId);
  return sortAndShuffleByDifficulty(topicQuestions);
}

function sortAndShuffleByDifficulty(questions: Question[]): Question[] {
  const levels = [1, 2, 3, 4];
  const result: Question[] = [];

  for (const lvl of levels) {
    const tier = questions.filter(q => q.level === lvl);
    // Shuffle within tier using Fisher-Yates
    const shuffled = [...tier];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    result.push(...shuffled);
  }

  return result;
}
