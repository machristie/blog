
# Looks like you need to quote registered variables in with_items expressions

Example: register `old_dist_dir` with results of `find` and then loop over it in
a separate task
```
- name: register the currently deployed distribution
  find:
      paths: "{{ deployment_dir }}"
      patterns: "apache-airavata-server-*-SNAPSHOT"
      file_type: directory
  register: old_dist_dir

- name: stop the server
  shell: "{{ item.path }}/bin/airavata-server-stop.sh"
  register: stop_airavata
  when: new_distribution.changed
  ignore_errors: True
  with_items: "{{ old_dist_dir.files }}"
```


This issue might be related?
https://github.com/ansible/ansible/issues/9879