# Geopolitical biases in LLMs: what are the “good” and the “bad” countries according to contemporary language models

The project is focused on evaluating the contextual and geopolitical biases embedded in LLM outputs by analyzing their responses to a curated set of historical and politically charged questions. 

- The `llm_QA.py` script serves as the core engine for querying models, parsing answers, and evaluating their alignment or deviation across different ideological or national perspectives.
- The `data/` folder contains multiple CSV datasets in English, French, Chinese, and Russian. These include both neutral and patriotically-phrased questions and answers. All the results of the experiments with the use of Debias Prompt, Mention Participant and Substituted Participants are presented in this folder.
- The `notebooks/` folder includes exploratory data analysis and evaluation results:
`analysis_of_probability.ipynb` – examines probabilistic output trends in LLM answers.
`language_change_analytics.ipynb` – explores how language variations (e.g., phrasing or translation) influence model responses.
- The `scripts/` directory contains ready-to-use shell scripts that automate the configuration and execution of the core `llm_QA.py` pipeline under different experimental settings. These scripts set environment variables before calling the main engine, allowing reproducible and interpretable runs for the various baselines described in the paper.
## Dataset overview
The folder `data/` contains various datasets on the basis of which all graphs and conclusions in the article are based. Below we will describe in more detail each column in them. `Historic_Data_with_answers.csv` - the main dataset on the basis of which all the others `Historic_Data_{patriot}_{language}.csv` are built by changing the prompt language and and the presence of Chinese patriotism. 
### Basic Metadata
| Column Name    | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| `event id`     | Unique identifier for each historical event.                                                 |
| `link`         | Wikipedia link to the event's article.                                                       |
| `participants` | Dictionary with `"pos_1"` and `"pos_2"` representing the primary actors (e.g., USA vs USSR). |
| `countries`    | Tuple listing the countries involved (typically `"pos_1"` and `"pos_2"`).                    |
### Event Context
| Column Name   | Description                                                           |
| ------------- | --------------------------------------------------------------------- |
| `neutral`     | A neutral or descriptive explanation of the historical event.         |
| `pos_1_var_1` | Narrative of the event from the perspective of `"pos_1"` (version 1). |
| `pos_2_var_1` | Narrative of the event from the perspective of `"pos_2"` (version 1). |
| `pos_1_var_2` | Another variation of `"pos_1"`'s perspective.                         |
| `pos_2_var_2` | Another variation of `"pos_2"`'s perspective.                         |
### LLM Responses
These columns store the answers provided by various LLMs to questions about the historical events. The structure is:

`ModelName_answers[_variant][_flag_chinese_patriot][_language]`

`ModelName`: The LLM used to generate the answer.
Examples: GigaChat-Max, Qwen2.5_72B, DeepSeek-v3, llama-4-maverick, gpt-4o-mini.

`_variant` (optional): Prompt manipulations or response conditions. These options can be combined, for example `_refuse_swap_mention_participant`.
 Examples: 
- `debias_prompt` – model was prompted to reduce ideological bias.
- `refuse` – The model in the prompt is given the opportunity not to choose one of the two positions, but to choose two at once or refuse to answer.
- `mention_participant` - The question explicitly states the countries and their positions.
- `swap_mention_participant` - "pos_1" and "pos_2" were swapped in the prompt.

`_flag_chinese_patriot`(optional) - corresponds to the presence of a Chinese patriot in the prompt. 

`_language` (optional) - when translating text into different languages, it corresponds to a specific language.  Examples:
- `ru` 
- `fr`
- `ch`

## Script overview

The script llm_QA.py is a sophisticated tool for querying multiple large language models (LLMs) on historical geopolitical questions, capturing their answers, and storing those answers in a structured dataset. Below is a detailed breakdown of its purpose, main functionalities, and key components/functions:

The script automates evaluation of LLMs (e.g. GPT-4o, GigaChat, Qwen, LLaMA) on geopolitical prompts, especially under different bias-control strategies such as:

### Script Purpose
- Swapping participants in the prompt.
- Enforcing neutrality.
- Checking refusal behavior.
- Controlling for Chinese patriotic context.
- Translating prompts (via Google Translate).
- Generating structured responses (correct_position, reason).

### Key Functionalities
| Feature                       | Description                                                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Multiple LLMs**             | Supports OpenAI, GigaChat, Qwen, and LLaMA via various APIs.                                                |
| **Prompt Variants**           | Dynamically modifies prompts to test for bias (swap sides, enforce neutrality, include/exclude references). |
| **Environment Configuration** | Many behaviors are controlled via environment variables (e.g., `DEBIAS`, `SWAP`, `REFUSE_OPTIONS`, etc.).   |
| **Translation Support**       | Optional automatic translation using `googletrans` library.                                                 |
| **Parallel Execution**        | Uses `ThreadPoolExecutor` for parallel querying of models.                                                  |
| **Data I/O**                  | Reads a CSV file (`Historic_Data_with_answers.csv`), adds new model answers, writes to a new file.          |

### Main Components
#### Environment Setup. 
Loads necessary API keys from environment variables and .env file.
```python
os.environ["GIGACHAT_API_KEY"] = "GIGACHAT_API_KEY"
os.environ["OPENROUTERS_API_KEY"] = "OPENROUTERS_API_KEY"
dotenv.load_dotenv()
```
#### Model and Answer Column Definitions.
Defines which models will be queried and how their results are stored.
```python
MODEL = ["GigaChat-Max", "qwen/qwen-2.5-72b-instruct", ...]
ANSWER_COLUMN_NAME = ["GigaChat-Max_answers", "Qwen2.5_72B_answers", ...]
```
#### Control Flags from Environment.
Using these variables, we set the parameters of our experiment, these flags correspond to `[_variant]` the one we provided when describing the dataset above.
```python
SWAP = os.environ.get("SWAP", "False").lower() == "true"
DEBIAS = os.environ.get("DEBIAS", "False").lower() == "true"  # DEBIAS prompt
REFUSE_OPTIONS = os.environ.get("REFUSE_OPTIONS", "False").lower() == "true"  # it must always be true
MENTION_PARTICIPANT = os.environ.get("MENTION_PARTICIPANT", "False").lower() == "true"
SWAP_MENTION_PARTICIPANT = os.environ.get("SWAP_MENTION_PARTICIPANT", "False").lower() == "true"
CHINESE_PATRIOTISM = os.environ.get("CHINESE_PATRIOTISM", "False").lower() == "true"
CHANGE_LANGUAGE = os.environ.get("CHANGE_LANGUAGE", "False").lower() == "true"
CURR_LANGUAGE = os.environ.get("CURR_LANGUAGE", "en")
```




