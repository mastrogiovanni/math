# Math

Simple Telegram Bot to practice in Math: it send to my son Paolo multiplications to compute.

## Installing the Chart

Add repository:

```console
$ helm repo add math https://mastrogiovanni.github.io/math/charts
```

```console
$ helm repo update
```

To install the chart with the release name `math-bot`:

```console
$ helm install math/math --name math-bot \
  --set telegram_bot_id=TELEGRAM-TOKEN
```

The command deploys Math Bot on the Kubernetes cluster in the default namespace.

## Uninstalling the Chart

To uninstall/delete the `math-bot` deployment:

```console
$ helm delete --purge math-bot
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Grafana chart and their default values.

Parameter | Description | Default
--- | --- | ---
`telegram_bot_id` | Telegram Bot Token | `-`

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install math/math --name math-bot -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
```
