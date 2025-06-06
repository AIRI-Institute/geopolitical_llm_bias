document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---
    // Manually parsed from the .tex.md files
    const results = {
        "English": {
            "UK-China": {
                "GigaChat-Max": { "Baseline": [52.6, 42.1, 0.0, 5.3], "Debias Prompt": [47.4, 47.4, 0.0, 5.3], "Mention Participant": [31.6, 31.6, 0.0, 36.8], "Substituted Participants": [26.3, 63.2, 0.0, 10.5] },
                "Qwen2.5 72B": { "Baseline": [42.1, 36.8, 0.0, 21.1], "Debias Prompt": [42.1, 21.1, 10.5, 26.3], "Mention Participant": [15.8, 21.1, 0.0, 63.2], "Substituted Participants": [5.3, 10.5, 78.9, 5.3] },
                "Llama-4-Mav.": { "Baseline": [52.6, 21.1, 0.0, 26.3], "Debias Prompt": [42.1, 21.1, 5.3, 31.6], "Mention Participant": [57.9, 10.5, 10.5, 21.1], "Substituted Participants": [10.5, 10.5, 73.7, 5.3] },
                "GPT-4o-mini": { "Baseline": [57.9, 42.1, 0.0, 0.0], "Debias Prompt": [52.6, 47.4, 0.0, 0.0], "Mention Participant": [57.9, 42.1, 0.0, 0.0], "Substituted Participants": [42.1, 36.8, 21.1, 0.0] }
            },
            "UK-USA": {
                "GigaChat-Max": { "Baseline": [36.4, 45.5, 18.2, 0.0], "Debias Prompt": [36.4, 45.5, 18.2, 0.0], "Mention Participant": [0.0, 36.4, 9.1, 54.5], "Substituted Participants": [18.2, 36.4, 27.3, 18.2] },
                "Qwen2.5 72B": { "Baseline": [27.3, 63.6, 0.0, 9.1], "Debias Prompt": [27.3, 54.5, 9.1, 9.1], "Mention Participant": [27.3, 0.0, 0.0, 72.7], "Substituted Participants": [27.3, 18.2, 54.5, 0.0] },
                "Llama-4-Mav.": { "Baseline": [9.1, 27.3, 9.1, 54.5], "Debias Prompt": [0.0, 27.3, 9.1, 63.6], "Mention Participant": [18.2, 0.0, 27.3, 54.5], "Substituted Participants": [9.1, 0.0, 72.7, 18.2] },
                "GPT-4o-mini": { "Baseline": [18.2, 81.8, 0.0, 0.0], "Debias Prompt": [27.3, 72.7, 0.0, 0.0], "Mention Participant": [0.0, 90.9, 9.1, 0.0], "Substituted Participants": [36.4, 36.4, 27.3, 0.0] }
            },
            "UK-USSR": {
                "GigaChat-Max": { "Baseline": [54.5, 27.3, 0.0, 18.2], "Debias Prompt": [54.5, 27.3, 0.0, 18.2], "Mention Participant": [36.4, 9.1, 9.1, 45.5], "Substituted Participants": [0.0, 36.4, 27.3, 36.4] },
                "Qwen2.5 72B": { "Baseline": [54.5, 9.1, 9.1, 27.3], "Debias Prompt": [36.4, 9.1, 9.1, 45.5], "Mention Participant": [27.3, 18.2, 0.0, 54.5], "Substituted Participants": [9.1, 9.1, 63.6, 18.2] },
                "Llama-4-Mav.": { "Baseline": [45.5, 0.0, 0.0, 54.5], "Debias Prompt": [45.5, 0.0, 0.0, 54.5], "Mention Participant": [36.4, 9.1, 18.2, 36.4], "Substituted Participants": [0.0, 0.0, 72.7, 27.3] },
                "GPT-4o-mini": { "Baseline": [72.7, 27.3, 0.0, 0.0], "Debias Prompt": [63.6, 36.4, 0.0, 0.0], "Mention Participant": [54.5, 18.2, 18.2, 9.1], "Substituted Participants": [18.2, 45.5, 36.4, 0.0] }
            },
            "USA-China": {
                "GigaChat-Max": { "Baseline": [71.4, 14.3, 0.0, 14.3], "Debias Prompt": [64.3, 14.3, 7.1, 14.3], "Mention Participant": [14.3, 21.4, 0.0, 64.3], "Substituted Participants": [14.3, 42.9, 14.3, 28.6] },
                "Qwen2.5 72B": { "Baseline": [28.6, 21.4, 7.1, 42.9], "Debias Prompt": [35.7, 14.3, 14.3, 35.7], "Mention Participant": [28.6, 14.3, 0.0, 57.1], "Substituted Participants": [7.1, 14.3, 71.4, 7.1] },
                "Llama-4-Mav.": { "Baseline": [28.6, 21.4, 7.1, 42.9], "Debias Prompt": [28.6, 21.4, 0.0, 50.0], "Mention Participant": [35.7, 14.3, 28.6, 21.4], "Substituted Participants": [21.4, 7.1, 71.4, 0.0] },
                "GPT-4o-mini": { "Baseline": [78.6, 21.4, 0.0, 0.0], "Debias Prompt": [85.7, 14.3, 0.0, 0.0], "Mention Participant": [71.4, 21.4, 7.1, 0.0], "Substituted Participants": [21.4, 28.6, 50.0, 0.0] }
            },
            "USSR-China": {
                "GigaChat-Max": { "Baseline": [20.7, 44.8, 31.0, 3.4], "Debias Prompt": [20.7, 44.8, 31.0, 3.4], "Mention Participant": [10.3, 31.0, 27.6, 31.0], "Substituted Participants": [0.0, 51.7, 37.9, 10.3] },
                "Qwen2.5 72B": { "Baseline": [27.6, 27.6, 34.5, 10.3], "Debias Prompt": [37.9, 27.6, 27.6, 6.9], "Mention Participant": [20.7, 24.1, 17.2, 37.9], "Substituted Participants": [10.3, 31.0, 58.6, 0.0] },
                "Llama-4-Mav.": { "Baseline": [6.9, 20.7, 17.2, 55.2], "Debias Prompt": [10.3, 20.7, 17.2, 51.7], "Mention Participant": [17.2, 10.3, 31.0, 41.4], "Substituted Participants": [6.9, 3.4, 79.3, 10.3] },
                "GPT-4o-mini": { "Baseline": [34.5, 51.7, 13.8, 0.0], "Debias Prompt": [27.6, 51.7, 20.7, 0.0], "Mention Participant": [24.1, 51.7, 24.1, 0.0], "Substituted Participants": [6.9, 34.5, 58.6, 0.0] }
            },
            "USSR-USA": {
                "GigaChat-Max": { "Baseline": [28.0, 64.0, 0.0, 8.0], "Debias Prompt": [32.0, 64.0, 0.0, 4.0], "Mention Participant": [8.0, 72.0, 4.0, 16.0], "Substituted Participants": [20.0, 60.0, 16.0, 4.0] },
                "Qwen2.5 72B": { "Baseline": [12.0, 52.0, 8.0, 28.0], "Debias Prompt": [12.0, 52.0, 8.0, 28.0], "Mention Participant": [4.0, 32.0, 8.0, 56.0], "Substituted Participants": [0.0, 40.0, 56.0, 4.0] },
                "Llama-4-Mav.": { "Baseline": [16.0, 24.0, 8.0, 52.0], "Debias Prompt": [16.0, 20.0, 12.0, 52.0], "Mention Participant": [8.0, 16.0, 48.0, 28.0], "Substituted Participants": [8.0, 12.0, 72.0, 8.0] },
                "GPT-4o-mini": { "Baseline": [16.0, 76.0, 8.0, 0.0], "Debias Prompt": [12.0, 80.0, 8.0, 0.0], "Mention Participant": [16.0, 72.0, 12.0, 0.0], "Substituted Participants": [20.0, 40.0, 40.0, 0.0] }
            }
        },
        "Chinese": {
            "UK-China": {
                "GigaChat-Max": { "Baseline": [52.6, 36.8, 0.0, 10.5], "Debias Prompt": [52.6, 36.8, 0.0, 10.5], "Mention Participant": [21.1, 31.6, 0.0, 47.4], "Substituted Participants": [26.3, 52.6, 0.0, 21.1] },
                "Qwen2.5 72B": { "Baseline": [42.1, 36.8, 0.0, 21.1], "Debias Prompt": [36.8, 36.8, 0.0, 26.3], "Mention Participant": [31.6, 26.3, 0.0, 42.1], "Substituted Participants": [31.6, 31.6, 26.3, 10.5] },
                "Llama-4-Mav.": { "Baseline": [31.6, 15.8, 5.3, 47.4], "Debias Prompt": [31.6, 10.5, 0.0, 57.9], "Mention Participant": [26.3, 5.3, 21.1, 47.4], "Substituted Participants": [36.8, 15.8, 36.8, 10.5] },
                "GPT-4o-mini": { "Baseline": [52.6, 47.4, 0.0, 0.0], "Debias Prompt": [52.6, 42.1, 5.3, 0.0], "Mention Participant": [47.4, 52.6, 0.0, 0.0], "Substituted Participants": [42.1, 15.8, 42.1, 0.0] }
            },
            "UK-USA": {
                "GigaChat-Max": { "Baseline": [27.3, 63.6, 9.1, 0.0], "Debias Prompt": [36.4, 45.5, 9.1, 9.1], "Mention Participant": [9.1, 45.5, 9.1, 36.4], "Substituted Participants": [0.0, 36.4, 27.3, 36.4] },
                "Qwen2.5 72B": { "Baseline": [36.4, 45.5, 0.0, 18.2], "Debias Prompt": [36.4, 45.5, 9.1, 9.1], "Mention Participant": [9.1, 18.2, 0.0, 72.7], "Substituted Participants": [27.3, 27.3, 36.4, 9.1] },
                "Llama-4-Mav.": { "Baseline": [18.2, 18.2, 18.2, 45.5], "Debias Prompt": [18.2, 27.3, 9.1, 45.5], "Mention Participant": [9.1, 0.0, 9.1, 81.8], "Substituted Participants": [9.1, 0.0, 54.5, 36.4] },
                "GPT-4o-mini": { "Baseline": [27.3, 72.7, 0.0, 0.0], "Debias Prompt": [27.3, 72.7, 0.0, 0.0], "Mention Participant": [54.5, 45.5, 0.0, 0.0], "Substituted Participants": [45.5, 27.3, 27.3, 0.0] }
            },
            "UK-USSR": {
                "GigaChat-Max": { "Baseline": [45.5, 36.4, 0.0, 18.2], "Debias Prompt": [27.3, 45.5, 0.0, 27.3], "Mention Participant": [9.1, 36.4, 0.0, 54.5], "Substituted Participants": [9.1, 54.5, 0.0, 36.4] },
                "Qwen2.5 72B": { "Baseline": [45.5, 18.2, 9.1, 27.3], "Debias Prompt": [27.3, 18.2, 18.2, 36.4], "Mention Participant": [9.1, 27.3, 9.1, 54.5], "Substituted Participants": [9.1, 9.1, 54.5, 27.3] },
                "Llama-4-Mav.": { "Baseline": [27.3, 0.0, 0.0, 72.7], "Debias Prompt": [27.3, 0.0, 0.0, 72.7], "Mention Participant": [0.0, 9.1, 18.2, 72.7], "Substituted Participants": [9.1, 0.0, 63.6, 27.3] },
                "GPT-4o-mini": { "Baseline": [63.6, 36.4, 0.0, 0.0], "Debias Prompt": [54.5, 27.3, 18.2, 0.0], "Mention Participant": [63.6, 36.4, 0.0, 0.0], "Substituted Participants": [45.5, 45.5, 9.1, 0.0] }
            },
            "USA-China": {
                "GigaChat-Max": { "Baseline": [50.0, 21.4, 0.0, 28.6], "Debias Prompt": [50.0, 21.4, 0.0, 28.6], "Mention Participant": [21.4, 21.4, 0.0, 57.1], "Substituted Participants": [14.3, 21.4, 7.1, 57.1] },
                "Qwen2.5 72B": { "Baseline": [50.0, 21.4, 0.0, 28.6], "Debias Prompt": [50.0, 7.1, 7.1, 35.7], "Mention Participant": [28.6, 21.4, 7.1, 42.9], "Substituted Participants": [7.1, 14.3, 50.0, 28.6] },
                "Llama-4-Mav.": { "Baseline": [42.9, 28.6, 0.0, 28.6], "Debias Prompt": [35.7, 28.6, 0.0, 35.7], "Mention Participant": [21.4, 21.4, 0.0, 57.1], "Substituted Participants": [21.4, 14.3, 64.3, 0.0] },
                "GPT-4o-mini": { "Baseline": [57.1, 42.9, 0.0, 0.0], "Debias Prompt": [64.3, 35.7, 0.0, 0.0], "Mention Participant": [78.6, 14.3, 7.1, 0.0], "Substituted Participants": [57.1, 21.4, 21.4, 0.0] }
            },
            "USSR-China": {
                "GigaChat-Max": { "Baseline": [17.2, 55.2, 17.2, 10.3], "Debias Prompt": [20.7, 48.3, 20.7, 10.3], "Mention Participant": [17.2, 31.0, 10.3, 41.4], "Substituted Participants": [3.4, 62.1, 17.2, 17.2] },
                "Qwen2.5 72B": { "Baseline": [31.0, 27.6, 13.8, 27.6], "Debias Prompt": [24.1, 34.5, 6.9, 34.5], "Mention Participant": [17.2, 24.1, 10.3, 48.3], "Substituted Participants": [6.9, 24.1, 48.3, 20.7] },
                "Llama-4-Mav.": { "Baseline": [27.6, 20.7, 6.9, 44.8], "Debias Prompt": [17.2, 24.1, 13.8, 44.8], "Mention Participant": [17.2, 10.3, 17.2, 55.2], "Substituted Participants": [6.9, 10.3, 62.1, 20.7] },
                "GPT-4o-mini": { "Baseline": [44.8, 51.7, 3.4, 0.0], "Debias Prompt": [48.3, 44.8, 6.9, 0.0], "Mention Participant": [51.7, 34.5, 13.8, 0.0], "Substituted Participants": [27.6, 41.4, 31.0, 0.0] }
            },
            "USSR-USA": {
                "GigaChat-Max": { "Baseline": [28.0, 56.0, 4.0, 12.0], "Debias Prompt": [28.0, 56.0, 8.0, 8.0], "Mention Participant": [12.0, 28.0, 0.0, 60.0], "Substituted Participants": [16.0, 36.0, 12.0, 36.0] },
                "Qwen2.5 72B": { "Baseline": [32.0, 40.0, 4.0, 24.0], "Debias Prompt": [32.0, 36.0, 4.0, 28.0], "Mention Participant": [24.0, 28.0, 4.0, 44.0], "Substituted Participants": [12.0, 36.0, 28.0, 24.0] },
                "Llama-4-Mav.": { "Baseline": [4.0, 16.0, 8.0, 72.0], "Debias Prompt": [4.0, 20.0, 8.0, 68.0], "Mention Participant": [8.0, 16.0, 12.0, 64.0], "Substituted Participants": [12.0, 12.0, 56.0, 20.0] },
                "GPT-4o-mini": { "Baseline": [16.0, 80.0, 4.0, 0.0], "Debias Prompt": [12.0, 84.0, 4.0, 0.0], "Mention Participant": [12.0, 72.0, 16.0, 0.0], "Substituted Participants": [28.0, 40.0, 32.0, 0.0] }
            }
        },
        "French": {
            "UK-China": {
                "GigaChat-Max": { "Baseline": [26.3, 21.1, 0.0, 52.6], "Debias Prompt": [21.1, 21.1, 0.0, 57.9], "Mention Participant": [0.0, 5.3, 0.0, 94.7], "Substituted Participants": [21.1, 36.8, 0.0, 42.1] },
                "Qwen2.5 72B": { "Baseline": [10.5, 21.1, 5.3, 63.2], "Debias Prompt": [5.3, 0.0, 5.3, 89.5], "Mention Participant": [0.0, 15.8, 0.0, 84.2], "Substituted Participants": [5.3, 5.3, 68.4, 21.1] },
                "Llama-4-Mav.": { "Baseline": [26.3, 5.3, 0.0, 68.4], "Debias Prompt": [21.1, 5.3, 0.0, 73.7], "Mention Participant": [26.3, 5.3, 5.3, 63.2], "Substituted Participants": [5.3, 10.5, 78.9, 5.3] },
                "GPT-4o-mini": { "Baseline": [47.4, 36.8, 15.8, 0.0], "Debias Prompt": [36.8, 42.1, 15.8, 5.3], "Mention Participant": [42.1, 52.6, 0.0, 5.3], "Substituted Participants": [31.6, 21.1, 47.4, 0.0] }
            },
            "UK-USA": {
                "GigaChat-Max": { "Baseline": [9.1, 27.3, 0.0, 63.6], "Debias Prompt": [9.1, 9.1, 0.0, 81.8], "Mention Participant": [0.0, 0.0, 0.0, 100.0], "Substituted Participants": [0.0, 18.2, 18.2, 63.6] },
                "Qwen2.5 72B": { "Baseline": [9.1, 0.0, 0.0, 90.9], "Debias Prompt": [9.1, 18.2, 0.0, 72.7], "Mention Participant": [0.0, 9.1, 0.0, 90.9], "Substituted Participants": [0.0, 9.1, 45.5, 45.5] },
                "Llama-4-Mav.": { "Baseline": [0.0, 9.1, 9.1, 81.8], "Debias Prompt": [9.1, 9.1, 9.1, 72.7], "Mention Participant": [0.0, 0.0, 0.0, 100.0], "Substituted Participants": [9.1, 0.0, 54.5, 36.4] },
                "GPT-4o-mini": { "Baseline": [18.2, 72.7, 9.1, 0.0], "Debias Prompt": [9.1, 72.7, 18.2, 0.0], "Mention Participant": [9.1, 81.8, 9.1, 0.0], "Substituted Participants": [27.3, 18.2, 54.5, 0.0] }
            },
            "UK-USSR": {
                "GigaChat-Max": { "Baseline": [36.4, 18.2, 0.0, 45.5], "Debias Prompt": [36.4, 18.2, 0.0, 45.5], "Mention Participant": [36.4, 0.0, 0.0, 63.6], "Substituted Participants": [9.1, 27.3, 9.1, 54.5] },
                "Qwen2.5 72B": { "Baseline": [27.3, 18.2, 0.0, 54.5], "Debias Prompt": [27.3, 9.1, 9.1, 54.5], "Mention Participant": [9.1, 0.0, 9.1, 81.8], "Substituted Participants": [9.1, 9.1, 45.5, 36.4] },
                "Llama-4-Mav.": { "Baseline": [18.2, 9.1, 9.1, 63.6], "Debias Prompt": [18.2, 9.1, 9.1, 63.6], "Mention Participant": [18.2, 0.0, 9.1, 72.7], "Substituted Participants": [0.0, 0.0, 63.6, 36.4] },
                "GPT-4o-mini": { "Baseline": [54.5, 27.3, 9.1, 9.1], "Debias Prompt": [54.5, 18.2, 9.1, 18.2], "Mention Participant": [36.4, 27.3, 9.1, 27.3], "Substituted Participants": [27.3, 9.1, 36.4, 27.3] }
            },
            "USA-China": {
                "GigaChat-Max": { "Baseline": [21.4, 21.4, 0.0, 57.1], "Debias Prompt": [21.4, 21.4, 0.0, 57.1], "Mention Participant": [0.0, 14.3, 0.0, 85.7], "Substituted Participants": [7.1, 14.3, 0.0, 78.6] },
                "Qwen2.5 72B": { "Baseline": [0.0, 7.1, 0.0, 92.9], "Debias Prompt": [0.0, 7.1, 0.0, 92.9], "Mention Participant": [0.0, 0.0, 0.0, 100.0], "Substituted Participants": [0.0, 0.0, 28.6, 71.4] },
                "Llama-4-Mav.": { "Baseline": [0.0, 7.1, 0.0, 92.9], "Debias Prompt": [0.0, 7.1, 0.0, 92.9], "Mention Participant": [14.3, 0.0, 0.0, 85.7], "Substituted Participants": [21.4, 0.0, 64.3, 14.3] },
                "GPT-4o-mini": { "Baseline": [85.7, 14.3, 0.0, 0.0], "Debias Prompt": [64.3, 14.3, 0.0, 21.4], "Mention Participant": [78.6, 14.3, 0.0, 7.1], "Substituted Participants": [21.4, 21.4, 42.9, 14.3] }
            },
            "USSR-China": {
                "GigaChat-Max": { "Baseline": [10.3, 34.5, 13.8, 41.4], "Debias Prompt": [10.3, 31.0, 17.2, 41.4], "Mention Participant": [0.0, 31.0, 10.3, 58.6], "Substituted Participants": [0.0, 31.0, 24.1, 44.8] },
                "Qwen2.5 72B": { "Baseline": [20.7, 17.2, 3.4, 58.6], "Debias Prompt": [10.3, 13.8, 3.4, 72.4], "Mention Participant": [3.4, 20.7, 0.0, 75.9], "Substituted Participants": [3.4, 17.2, 41.4, 37.9] },
                "Llama-4-Mav.": { "Baseline": [10.3, 3.4, 3.4, 82.8], "Debias Prompt": [10.3, 0.0, 10.3, 79.3], "Mention Participant": [0.0, 6.9, 6.9, 86.2], "Substituted Participants": [3.4, 6.9, 55.2, 34.5] },
                "GPT-4o-mini": { "Baseline": [17.2, 44.8, 34.5, 3.4], "Debias Prompt": [13.8, 51.7, 31.0, 3.4], "Mention Participant": [17.2, 44.8, 31.0, 6.9], "Substituted Participants": [3.4, 44.8, 51.7, 0.0] }
            },
            "USSR-USA": {
                "GigaChat-Max": { "Baseline": [12.0, 40.0, 0.0, 48.0], "Debias Prompt": [12.0, 40.0, 0.0, 48.0], "Mention Participant": [8.0, 20.0, 0.0, 72.0], "Substituted Participants": [20.0, 56.0, 8.0, 16.0] },
                "Qwen2.5 72B": { "Baseline": [4.0, 16.0, 4.0, 76.0], "Debias Prompt": [0.0, 16.0, 4.0, 80.0], "Mention Participant": [0.0, 12.0, 4.0, 84.0], "Substituted Participants": [0.0, 28.0, 12.0, 60.0] },
                "Llama-4-Mav.": { "Baseline": [0.0, 12.0, 4.0, 84.0], "Debias Prompt": [0.0, 4.0, 8.0, 88.0], "Mention Participant": [0.0, 4.0, 12.0, 84.0], "Substituted Participants": [8.0, 16.0, 52.0, 24.0] },
                "GPT-4o-mini": { "Baseline": [24.0, 64.0, 8.0, 4.0], "Debias Prompt": [28.0, 64.0, 8.0, 0.0], "Mention Participant": [8.0, 80.0, 12.0, 0.0], "Substituted Participants": [24.0, 44.0, 32.0, 0.0] }
            }
        },
        "Russian": {
            "UK-China": {
                "GigaChat-Max": { "Baseline": [36.8, 57.9, 0.0, 5.3], "Debias Prompt": [31.6, 63.2, 0.0, 5.3], "Mention Participant": [15.8, 52.6, 0.0, 31.6], "Substituted Participants": [15.8, 78.9, 5.3, 0.0] },
                "Qwen2.5 72B": { "Baseline": [42.1, 31.6, 5.3, 21.1], "Debias Prompt": [21.1, 31.6, 5.3, 42.1], "Mention Participant": [10.5, 21.1, 5.3, 63.2], "Substituted Participants": [5.3, 10.5, 84.2, 0.0] },
                "Llama-4-Mav.": { "Baseline": [36.8, 21.1, 10.5, 31.6], "Debias Prompt": [36.8, 21.1, 10.5, 31.6], "Mention Participant": [52.6, 21.1, 21.1, 5.3], "Substituted Participants": [5.3, 5.3, 89.5, 0.0] },
                "GPT-4o-mini": { "Baseline": [42.1, 57.9, 0.0, 0.0], "Debias Prompt": [42.1, 57.9, 0.0, 0.0], "Mention Participant": [52.6, 42.1, 5.3, 0.0], "Substituted Participants": [31.6, 26.3, 42.1, 0.0] }
            },
            "UK-USA": {
                "GigaChat-Max": { "Baseline": [27.3, 63.6, 9.1, 0.0], "Debias Prompt": [18.2, 45.5, 9.1, 27.3], "Mention Participant": [0.0, 63.6, 0.0, 36.4], "Substituted Participants": [0.0, 45.5, 36.4, 18.2] },
                "Qwen2.5 72B": { "Baseline": [9.1, 45.5, 9.1, 36.4], "Debias Prompt": [9.1, 63.6, 0.0, 27.3], "Mention Participant": [9.1, 27.3, 0.0, 63.6], "Substituted Participants": [0.0, 27.3, 54.5, 18.2] },
                "Llama-4-Mav.": { "Baseline": [18.2, 18.2, 9.1, 54.5], "Debias Prompt": [18.2, 9.1, 9.1, 63.6], "Mention Participant": [9.1, 18.2, 18.2, 54.5], "Substituted Participants": [9.1, 0.0, 72.7, 18.2] },
                "GPT-4o-mini": { "Baseline": [18.2, 81.8, 0.0, 0.0], "Debias Prompt": [27.3, 63.6, 9.1, 0.0], "Mention Participant": [0.0, 81.8, 18.2, 0.0], "Substituted Participants": [9.1, 36.4, 54.5, 0.0] }
            },
            "UK-USSR": {
                "GigaChat-Max": { "Baseline": [45.5, 18.2, 9.1, 27.3], "Debias Prompt": [36.4, 18.2, 18.2, 27.3], "Mention Participant": [18.2, 27.3, 9.1, 45.5], "Substituted Participants": [9.1, 27.3, 27.3, 36.4] },
                "Qwen2.5 72B": { "Baseline": [45.5, 9.1, 0.0, 45.5], "Debias Prompt": [36.4, 18.2, 0.0, 45.5], "Mention Participant": [36.4, 9.1, 0.0, 54.5], "Substituted Participants": [27.3, 9.1, 27.3, 36.4] },
                "Llama-4-Mav.": { "Baseline": [45.5, 0.0, 0.0, 54.5], "Debias Prompt": [45.5, 0.0, 0.0, 54.5], "Mention Participant": [36.4, 0.0, 27.3, 36.4], "Substituted Participants": [9.1, 0.0, 63.6, 27.3] },
                "GPT-4o-mini": { "Baseline": [36.4, 54.5, 0.0, 9.1], "Debias Prompt": [54.5, 45.5, 0.0, 0.0], "Mention Participant": [54.5, 45.5, 0.0, 0.0], "Substituted Participants": [27.3, 36.4, 36.4, 0.0] }
            },
            "USA-China": {
                "GigaChat-Max": { "Baseline": [28.6, 42.9, 7.1, 21.4], "Debias Prompt": [28.6, 35.7, 7.1, 28.6], "Mention Participant": [14.3, 42.9, 0.0, 42.9], "Substituted Participants": [21.4, 57.1, 7.1, 14.3] },
                "Qwen2.5 72B": { "Baseline": [14.3, 21.4, 14.3, 50.0], "Debias Prompt": [7.1, 14.3, 14.3, 64.3], "Mention Participant": [7.1, 21.4, 7.1, 64.3], "Substituted Participants": [0.0, 35.7, 64.3, 0.0] },
                "Llama-4-Mav.": { "Baseline": [35.7, 7.1, 0.0, 57.1], "Debias Prompt": [14.3, 7.1, 14.3, 64.3], "Mention Participant": [35.7, 14.3, 28.6, 21.4], "Substituted Participants": [0.0, 7.1, 85.7, 7.1] },
                "GPT-4o-mini": { "Baseline": [42.9, 57.1, 0.0, 0.0], "Debias Prompt": [50.0, 50.0, 0.0, 0.0], "Mention Participant": [57.1, 35.7, 7.1, 0.0], "Substituted Participants": [0.0, 42.9, 57.1, 0.0] }
            },
            "USSR-China": {
                "GigaChat-Max": { "Baseline": [34.5, 37.9, 13.8, 13.8], "Debias Prompt": [31.0, 24.1, 31.0, 13.8], "Mention Participant": [13.8, 27.6, 13.8, 44.8], "Substituted Participants": [0.0, 65.5, 24.1, 10.3] },
                "Qwen2.5 72B": { "Baseline": [34.5, 20.7, 20.7, 24.1], "Debias Prompt": [34.5, 24.1, 20.7, 20.7], "Mention Participant": [17.2, 10.3, 17.2, 55.2], "Substituted Participants": [3.4, 34.5, 55.2, 6.9] },
                "Llama-4-Mav.": { "Baseline": [17.2, 10.3, 17.2, 55.2], "Debias Prompt": [20.7, 10.3, 17.2, 51.7], "Mention Participant": [13.8, 17.2, 20.7, 48.3], "Substituted Participants": [6.9, 17.2, 62.1, 13.8] },
                "GPT-4o-mini": { "Baseline": [51.7, 44.8, 3.4, 0.0], "Debias Prompt": [44.8, 44.8, 10.3, 0.0], "Mention Participant": [37.9, 34.5, 27.6, 0.0], "Substituted Participants": [6.9, 51.7, 41.4, 0.0] }
            },
            "USSR-USA": {
                "GigaChat-Max": { "Baseline": [36.0, 48.0, 0.0, 16.0], "Debias Prompt": [32.0, 48.0, 0.0, 20.0], "Mention Participant": [24.0, 40.0, 4.0, 32.0], "Substituted Participants": [12.0, 52.0, 16.0, 20.0] },
                "Qwen2.5 72B": { "Baseline": [16.0, 28.0, 8.0, 48.0], "Debias Prompt": [12.0, 28.0, 4.0, 56.0], "Mention Participant": [16.0, 24.0, 4.0, 56.0], "Substituted Participants": [4.0, 24.0, 52.0, 20.0] },
                "Llama-4-Mav.": { "Baseline": [28.0, 16.0, 0.0, 56.0], "Debias Prompt": [28.0, 12.0, 0.0, 60.0], "Mention Participant": [12.0, 8.0, 44.0, 36.0], "Substituted Participants": [12.0, 4.0, 72.0, 12.0] },
                "GPT-4o-mini": { "Baseline": [36.0, 64.0, 0.0, 0.0], "Debias Prompt": [32.0, 64.0, 4.0, 0.0], "Mention Participant": [24.0, 64.0, 12.0, 0.0], "Substituted Participants": [4.0, 48.0, 48.0, 0.0] }
            }
        },
        "Patriot-English": {
            "UK-China": {
                "GigaChat-Max": { "Baseline": [10.5, 89.5, 0.0, 0.0], "Debias Prompt": [10.5, 89.5, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [10.5, 89.5, 0.0, 0.0] },
                "Qwen2.5 72B": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [10.5, 63.2, 26.3, 0.0] },
                "Llama-4-Mav.": { "Baseline": [5.3, 89.5, 0.0, 5.3], "Debias Prompt": [5.3, 84.2, 0.0, 10.5], "Mention Participant": [0.0, 94.7, 0.0, 5.3], "Substituted Participants": [10.5, 57.9, 26.3, 5.3] },
                "GPT-4o-mini": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [15.8, 84.2, 0.0, 0.0] }
            },
             "USA-China": {
                "GigaChat-Max": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [0.0, 100.0, 0.0, 0.0] },
                "Qwen2.5 72B": { "Baseline": [0.0, 92.9, 7.1, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [7.1, 78.6, 14.3, 0.0] },
                "Llama-4-Mav.": { "Baseline": [0.0, 92.9, 0.0, 7.1], "Debias Prompt": [0.0, 92.9, 0.0, 7.1], "Mention Participant": [0.0, 92.9, 0.0, 7.1], "Substituted Participants": [21.4, 42.9, 28.6, 7.1] },
                "GPT-4o-mini": { "Baseline": [7.1, 92.9, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [21.4, 64.3, 14.3, 0.0] }
            }
        },
         "Patriot-Chinese": {
            "UK-China": {
                "GigaChat-Max": { "Baseline": [15.8, 84.2, 0.0, 0.0], "Debias Prompt": [15.8, 84.2, 0.0, 0.0], "Mention Participant": [5.3, 94.7, 0.0, 0.0], "Substituted Participants": [26.3, 68.4, 0.0, 5.3] },
                "Qwen2.5 72B": { "Baseline": [10.5, 89.5, 0.0, 0.0], "Debias Prompt": [0.0, 84.2, 5.3, 10.5], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [21.1, 73.7, 5.3, 0.0] },
                "Llama-4-Mav.": { "Baseline": [5.3, 78.9, 0.0, 15.8], "Debias Prompt": [5.3, 63.2, 5.3, 26.3], "Mention Participant": [0.0, 94.7, 0.0, 5.3], "Substituted Participants": [15.8, 42.1, 26.3, 15.8] },
                "GPT-4o-mini": { "Baseline": [10.5, 89.5, 0.0, 0.0], "Debias Prompt": [10.5, 89.5, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [57.9, 42.1, 0.0, 0.0] }
            },
             "USA-China": {
                "GigaChat-Max": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 92.9, 0.0, 7.1], "Mention Participant": [0.0, 92.9, 0.0, 7.1], "Substituted Participants": [35.7, 42.9, 0.0, 21.4] },
                "Qwen2.5 72B": { "Baseline": [14.3, 57.1, 14.3, 14.3], "Debias Prompt": [14.3, 57.1, 7.1, 21.4], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [14.3, 42.9, 35.7, 7.1] },
                "Llama-4-Mav.": { "Baseline": [14.3, 57.1, 0.0, 28.6], "Debias Prompt": [7.1, 57.1, 0.0, 35.7], "Mention Participant": [0.0, 92.9, 0.0, 7.1], "Substituted Participants": [35.7, 42.9, 14.3, 7.1] },
                "GPT-4o-mini": { "Baseline": [7.1, 92.9, 0.0, 0.0], "Debias Prompt": [7.1, 92.9, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [64.3, 21.4, 14.3, 0.0] }
            }
        },
        "Patriot-French": {
            "UK-China": {
                "GigaChat-Max": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [10.5, 84.2, 0.0, 5.3] },
                "Qwen2.5 72B": { "Baseline": [0.0, 94.7, 0.0, 5.3], "Debias Prompt": [0.0, 94.7, 0.0, 5.3], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [10.5, 89.5, 0.0, 0.0] },
                "Llama-4-Mav.": { "Baseline": [5.3, 84.2, 0.0, 10.5], "Debias Prompt": [5.3, 73.7, 0.0, 21.1], "Mention Participant": [0.0, 94.7, 0.0, 5.3], "Substituted Participants": [10.5, 63.2, 21.1, 5.3] },
                "GPT-4o-mini": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [47.4, 52.6, 0.0, 0.0] }
            },
            "USA-China": {
                "GigaChat-Max": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 71.4, 0.0, 28.6], "Mention Participant": [0.0, 85.7, 0.0, 14.3], "Substituted Participants": [7.1, 57.1, 0.0, 35.7] },
                "Qwen2.5 72B": { "Baseline": [0.0, 85.7, 0.0, 14.3], "Debias Prompt": [0.0, 92.9, 0.0, 7.1], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [0.0, 78.6, 0.0, 21.4] },
                "Llama-4-Mav.": { "Baseline": [0.0, 71.4, 0.0, 28.6], "Debias Prompt": [0.0, 50.0, 0.0, 50.0], "Mention Participant": [0.0, 92.9, 0.0, 7.1], "Substituted Participants": [7.1, 50.0, 35.7, 7.1] },
                "GPT-4o-mini": { "Baseline": [0.0, 92.9, 0.0, 7.1], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [21.4, 64.3, 7.1, 7.1] }
            }
        },
        "Patriot-Russian": {
             "UK-China": {
                "GigaChat-Max": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [0.0, 100.0, 0.0, 0.0] },
                "Qwen2.5 72B": { "Baseline": [0.0, 94.7, 5.3, 0.0], "Debias Prompt": [0.0, 89.5, 5.3, 5.3], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [5.3, 84.2, 10.5, 0.0] },
                "Llama-4-Mav.": { "Baseline": [5.3, 89.5, 0.0, 5.3], "Debias Prompt": [0.0, 73.7, 0.0, 26.3], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [21.1, 63.2, 10.5, 5.3] },
                "GPT-4o-mini": { "Baseline": [0.0, 100.0, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [36.8, 63.2, 0.0, 0.0] }
            },
            "USA-China": {
                "GigaChat-Max": { "Baseline": [7.1, 92.9, 0.0, 0.0], "Debias Prompt": [7.1, 85.7, 7.1, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [7.1, 85.7, 7.1, 0.0] },
                "Qwen2.5 72B": { "Baseline": [7.1, 92.9, 0.0, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [7.1, 78.6, 14.3, 0.0] },
                "Llama-4-Mav.": { "Baseline": [0.0, 78.6, 14.3, 7.1], "Debias Prompt": [7.1, 64.3, 7.1, 21.4], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [14.3, 42.9, 35.7, 7.1] },
                "GPT-4o-mini": { "Baseline": [0.0, 92.9, 7.1, 0.0], "Debias Prompt": [0.0, 100.0, 0.0, 0.0], "Mention Participant": [0.0, 100.0, 0.0, 0.0], "Substituted Participants": [50.0, 50.0, 0.0, 0.0] }
            }
        }
    };

    let interactiveChart;

    const chartColors = {
        country1: 'rgba(54, 162, 235, 0.7)',  // Blue
        country2: 'rgba(255, 99, 132, 0.7)',   // Red
        incorrect: 'rgba(255, 206, 86, 0.7)', // Yellow
        equal: 'rgba(75, 192, 192, 0.7)',    // Green
        darkGray: 'rgba(100, 100, 100, 0.8)',
        lightGray: 'rgba(200, 200, 200, 0.8)'
    };

    // --- CHART CREATION FUNCTIONS ---

    function createBarChart(ctx, labels, datasets) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(1) + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    function updateInteractiveChart() {
        let model = document.getElementById('modelSelect').value;
        const countryPair = document.getElementById('countrySelect').value;
        const language = document.getElementById('languageSelect').value;
        const experiment = document.querySelector('.experiment-btn.active').dataset.type;

        let langResults = results[language];
        if (experiment === 'Patriot') {
            // Logic to decide which patriot data to use based on language
            if(language === 'English') langResults = results['Patriot-English'];
            else if(language === 'Chinese') langResults = results['Patriot-Chinese'];
            else if(language === 'French') langResults = results['Patriot-French'];
            else if(language === 'Russian') langResults = results['Patriot-Russian'];

            // No need to change model name - data structure is consistent
        }


        const experimentTypes = ["Baseline", "Debias Prompt", "Mention Participant", "Substituted Participants"];
        const chartData = experimentTypes.map(exp => {
            return (langResults[countryPair] && langResults[countryPair][model] && langResults[countryPair][model][exp]) ? langResults[countryPair][model][exp] : [0, 0, 0, 0];
        });

        const [country1, country2] = countryPair.split('-');

        const datasets = [
            { label: `Favored ${country1}`, data: chartData.map(d => d[0]), backgroundColor: chartColors.country1 },
            { label: `Favored ${country2}`, data: chartData.map(d => d[1]), backgroundColor: chartColors.country2 },
            { label: 'Incorrect', data: chartData.map(d => d[2]), backgroundColor: chartColors.incorrect },
            { label: 'Equal', data: chartData.map(d => d[3]), backgroundColor: chartColors.equal }
        ];

        const ctx = document.getElementById('interactiveChart').getContext('2d');
        if (interactiveChart) {
            interactiveChart.destroy();
        }
        interactiveChart = createBarChart(ctx, experimentTypes, datasets);
    }

    function updateExperimentDescription(experimentType) {
        const descriptionEl = document.getElementById('experiment-description');
        if (!descriptionEl) return;

        const descriptions = {
            'Baseline': 'Standard prompts without any bias mitigation techniques.',
            'Debias Prompt': 'Prompts explicitly asking the model to be unbiased and neutral.',
            'Mention Participant': 'Prompts that explicitly mention the countries involved in the comparison.',
            'Substituted Participants': 'Prompts where country names are replaced with placeholder terms.',
            'Patriot': 'Model instructed to act as a "Chinese Patriot" of one of the involved nations. This can dramatically amplify bias.'
        };

        descriptionEl.textContent = descriptions[experimentType] || descriptions['Baseline'];
    }

    function managePatriotButtonVisibility() {
        const countryPair = document.getElementById('countrySelect').value;
        const patriotBtn = document.getElementById('patriot-btn');
        if (!patriotBtn) return false;

        const patriotPairs = ["UK-China", "USA-China"];

        if (patriotPairs.includes(countryPair)) {
            patriotBtn.style.display = 'inline-flex';
            return false;
        } else {
            patriotBtn.style.display = 'none';
            if (patriotBtn.classList.contains('active')) {
                const baselineBtn = document.querySelector('button[data-type="Baseline"]');
                if (baselineBtn) {
                    baselineBtn.click();
                    return true;
                }
            }
        }
        return false;
    }

    function setupEventListeners() {
        document.getElementById('modelSelect').addEventListener('change', updateInteractiveChart);
        document.getElementById('countrySelect').addEventListener('change', () => {
            const chartUpdatedViaClick = managePatriotButtonVisibility();
            if (!chartUpdatedViaClick) {
                updateInteractiveChart();
            }
        });
        document.getElementById('languageSelect').addEventListener('change', updateInteractiveChart);

        document.querySelectorAll('.experiment-btn').forEach(button => {
            button.addEventListener('click', function () {
                // First, remove active states from all buttons and set to default
                document.querySelectorAll('.experiment-btn').forEach(btn => {
                    btn.classList.remove('active', 'bg-gray-800', 'text-white');
                    // Reset to default styles
                    if(btn.dataset.type === 'Patriot'){
                        btn.classList.add('bg-red-100', 'text-red-800');
                    } else {
                        btn.classList.add('bg-gray-200', 'text-gray-800');
                    }
                });

                // Then, apply active style to the clicked button
                this.classList.add('active', 'bg-gray-800', 'text-white');
                this.classList.remove('bg-gray-200', 'text-gray-800', 'bg-red-100', 'text-red-800');
                
                // Update description
                updateExperimentDescription(this.dataset.type);
                
                updateInteractiveChart();
            });
        });

        const copyButton = document.getElementById('copy-citation');
        const citationText = document.getElementById('citation-text');
        if (copyButton && citationText) {
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(citationText.textContent.trim()).then(() => {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy Citation';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        }
    }

    // Initial setup
    setupEventListeners();
    managePatriotButtonVisibility();
    updateInteractiveChart();
    updateExperimentDescription('Baseline'); // Set initial description
}); 