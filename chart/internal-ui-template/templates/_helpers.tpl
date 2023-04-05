{{- define "applicationName" -}}
{{- if .Values.reviewBuild.enabled -}}
{{- printf "%s-%v"  .Values.application.name .Values.reviewBuild.reviewName | trunc 63 -}}
{{- else -}}
{{- .Values.application.name | trunc 63 -}}
{{- end -}}
{{- end -}}

{{- define "hostsString" -}}
{{$hosts := .Values.mesh.hosts }}
{{- range $index, $host := .Values.mesh.hosts -}}
{{ if $index }},{{- end -}}{{ tpl ($host | quote) $ }}
{{- end -}}
{{- end -}}

{{- define "applicationVersion" -}}
{{ .Values.deployment.image.tag | default .Chart.AppVersion | quote }}
{{- end -}}

{{- define "deploymentFqim" -}}
{{ .Values.deployment.image.repository }}/{{ .Values.deployment.image.name }}:{{ .Values.deployment.image.tag }}
{{- end -}}