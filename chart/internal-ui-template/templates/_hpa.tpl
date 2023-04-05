{{/*
Set HPA min/max replicas dynamically for hpa.
*/}}
{{ define "hpaConfig" -}}
minReplicas: {{ .Values.autoScaling.minReplicas | default 1 }}
maxReplicas: {{ .Values.autoScaling.maxReplicas | default 1 }}
targetCPUUtilizationPercentage: {{ .Values.autoScaling.targetCPUUtilizationPercentage }}
{{ end -}}

{{/*
Build hpa template here, because the boolean does not work with include within an if or eq.
*/}}
{{- define "hpa" }}
{{ if .Values.autoScaling.enabled }}
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "applicationName" . }}
spec:
  scaleTargetRef:
    apiVersion: argoproj.io/v1alpha1
    kind: Rollout
    name: {{ include "applicationName" . }}
{{ include "hpaConfig" . | indent 2 -}}
{{ end }}
{{ end }}