# Geopolitical biases in LLMs: what are the “good” and the “bad” countries according to contemporary language models

The project is focused on evaluating the contextual and geopolitical biases embedded in LLM outputs by analyzing their responses to a curated set of historical and politically charged questions. 

- The `llm_QA.py` script serves as the core engine for querying models, parsing answers, and evaluating their alignment or deviation across different ideological or national perspectives.
- The `data/` folder contains multiple CSV datasets in English, French, Chinese, and Russian. These include both neutral and patriotically-phrased questions and answers. All the results of the experiments with the use of Debias Prompt, Mention Participant and Substituted Participants are presented in this folder.
- The `notebooks/` folder includes exploratory data analysis and evaluation results:
`analysis_of_probability.ipynb` – examines probabilistic output trends in LLM answers.
`language_change_analytics.ipynb` – explores how language variations (e.g., phrasing or translation) influence model responses.
- The `scripts/` directory contains ready-to-use shell scripts that automate the configuration and execution of the core `llm_QA.py` pipeline under different experimental settings. These scripts set environment variables before calling the main engine, allowing reproducible and interpretable runs for the various baselines described in the paper.