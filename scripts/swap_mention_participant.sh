#!/bin/bash

# Установка переменных окружения
export CHANGE_LANGUAGE="True"
export REFUSE_OPTIONS="True"
export MENTION_PARTICIPANT="True"
export SWAP_MENTION_PARTICIPANT="True"
export CURR_LANGUAGE="fr"


# launch Python-script
python llm_QA.py
