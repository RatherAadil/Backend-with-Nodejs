const a = process;
console.log(a);
console.log(a.pid); //process id
console.log(a.ppid); //process parent id
console.log(a.env); //environment variables.

// 1. Definition
// Process = Running program (application or background task).
// Unit of execution handled by CPU.

// 2. Key Properties
// Takes RAM (memory) + CPU time.
// Has Process ID (PID).
// Has Parent Process ID (PPID).

// 3. Process States
// Ready → waiting for CPU.
// Waiting → blocked by some other event.
// Running → currently executing.
// Sleep → idle until triggered (server waiting for requests).
// Terminated → finished execution.

// 4. Tools to View Processes
// Windows → Task Manager
// MacOS → Activity Monitor (per-core % usage)
// Advanced → Process Explorer, System Informer

// 5. Context Switch
// Switching CPU execution between processes.
// Happens millions of times per second.

// 6. In Node.js
// Running node app.js → starts a new process.

// Each process has:
// pid (own ID)
// ppid (parent process – Explorer, Terminal, VS Code).
// Infinite loop burns 1 core fully → ~8.3% on a 12-core system.
// Running multiple Node processes → scales CPU usage across cores.

// Use process object:
// console.log(process.pid);   // process ID
// console.log(process.ppid);  // parent process ID
// console.log(process.env);   // environment variables
