Dodawanie klucza openAi lokalnie:

(ten krok nie jestem pewien czy trzeba robić na każdym urządzeniu)
```bash
dotnet user-secrets init
```

Dodanie klucza:
```bash
dotnet user-secrets set "OpenAi_Key" "YourSecretValue"
```