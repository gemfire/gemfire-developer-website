---
title: "{{ replace (replace .Name "-" " " | title) " Gs" "" -}}"
date: "{{ now.Format "2006-01-02" }}"
lastmod: "{{ now.Format "2006-01-02" }}"
description: "{{ replace (replace .Name "-" " " | title) " Gs" "" -}}"
type: tutorials
team:
-
---
