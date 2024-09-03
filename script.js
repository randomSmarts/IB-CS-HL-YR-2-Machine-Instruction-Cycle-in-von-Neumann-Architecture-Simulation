// Mock memory setup: an array representing memory with instructions and data
const memory = [
    101, // Opcode for LOAD (load value from memory to accumulator)
    1,   // Address of the first operand (value = 5)
    102, // Opcode for ADD (add value from memory to accumulator)
    2,   // Address of the second operand (value = 10)
    103, // Opcode for STORE (store accumulator value back to memory)
    3,   // Address to store the result
    0    // HALT (stop the program)
];

// Data stored in memory
const dataMemory = [5, 10, 0]; // Data: 5 and 10, result will be stored at index 2

// Registers
let programCounter = 0;
let instructionRegister = 0;
let memoryAddressRegister = 0;
let accumulator = 0;

function startSimulation() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous output

    const delay = 1000; // 1-second delay between each step

    let steps = [];

    while (true) {
        // Fetch phase
        instructionRegister = memory[programCounter];
        steps.push(`<span class="fetch">-- FETCH PHASE --<br>Fetched Instruction: ${instructionRegister}</span>`);
        programCounter++;

        // Decode and Execute phase
        let decodeExecuteStep = `<span class="decode-execute">-- DECODE & EXECUTE PHASE --<br>`;
        switch (instructionRegister) {
            case 101: // LOAD instruction
                memoryAddressRegister = memory[programCounter];
                accumulator = dataMemory[memoryAddressRegister];
                decodeExecuteStep += `Instruction: LOAD<br>Loaded value ${accumulator} from memory address ${memoryAddressRegister}</span>`;
                programCounter++;
                break;

            case 102: // ADD instruction
                memoryAddressRegister = memory[programCounter];
                accumulator += dataMemory[memoryAddressRegister];
                decodeExecuteStep += `Instruction: ADD<br>Added value from memory address ${memoryAddressRegister} to accumulator.<br>New Accumulator value: ${accumulator}</span>`;
                programCounter++;
                break;

            case 103: // STORE instruction
                memoryAddressRegister = memory[programCounter];
                dataMemory[memoryAddressRegister] = accumulator;
                decodeExecuteStep += `Instruction: STORE<br>Stored Accumulator value ${accumulator} to memory address ${memoryAddressRegister}</span>`;
                programCounter++;
                break;

            case 0: // HALT instruction
                decodeExecuteStep += `Instruction: HALT<br>Execution complete. Program halted.</span>`;
                steps.push(decodeExecuteStep);
                displaySteps(steps, outputDiv, delay);
                return;

            default:
                decodeExecuteStep += `Unknown instruction encountered. Halting program.</span>`;
                steps.push(decodeExecuteStep);
                displaySteps(steps, outputDiv, delay);
                return;
        }
        steps.push(decodeExecuteStep);

        // Display current state
        steps.push(`<span class="state">-- CURRENT STATE --<br>Program Counter (PC): ${programCounter}<br>Accumulator (ACC): ${accumulator}</span>`);
    }

    displaySteps(steps, outputDiv, delay);
}

function displaySteps(steps, outputDiv, delay) {
    steps.forEach((step, index) => {
        setTimeout(() => {
            outputDiv.innerHTML += step + "<br>";
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }, index * delay);
    });
}