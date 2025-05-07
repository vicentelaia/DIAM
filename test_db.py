import datetime
import time
from datetime import timedelta,date
from votacao.models import Questao, Opcao
from django.utils import timezone

#ex3

#reposta a alinea a)
def listarQuestoes():
    questoes = Questao.objects.all()
    for questao in questoes:
        print(f"Questao:{questao.questao_texto}")


#resposta a b)
def filtrarQuestao(string):
    questoes_filtradas = Questao.objects.filter(questao_texto__icontains=string)
    for questao in questoes_filtradas:
        x = questao.opcao_set.all()
        for opcao in x:
            print(f" - Opcao: {opcao.opcao_texto} ({opcao.votos} votos)")


#resposta a c)
def VotosSuperior(vote_threshold, search_text):
    c = Questao.objects.filter(questao_texto__icontains=search_text)
    for questao in c:
        options = questao.opcao_set.all()
        for x in options:
            if x.votos > vote_threshold:
                print(f"- Opcao com numero de votos superior a {vote_threshold}: {x.opcao_texto} ({x.votos} votos)")


#resposta a d)
def questoes3anos():
    questoes = Questao.objects.filter(pub_data__year=timezone.now().year)

    if questoes.exists():
        print("Questoes publicadas nos ultimos 3 anos:")
        for questao in questoes:
            print(f"- {questao.questao_texto} (Publicado em: {questao.pub_data})")
    else:
        print("Nenhuma questao foi publicada nos ultimos 3 anos.")


#resposta a e)
def totalVotos():
    total_votos = 0
    for opcao in Opcao.objects.all():
        total_votos += opcao.votos
    print(f"Total de votos registados na base de dados: {total_votos}")

#resposta a f)
def QuestaoComMaisVotos():
    for questao in Questao.objects.all():
        opcao_mais_votada = questao.opcao_set.order_by('-votos').first()

        if opcao_mais_votada:
            print(f"Questao: {questao.questao_texto}")
            print(f" - Opcao mais votada: {opcao_mais_votada.opcao_texto} ({opcao_mais_votada.votos} votos)")
        else:
            print(f"Questao: {questao.questao_texto} (Sem opcoes registadas)")


listarQuestoes()
filtrarQuestao("Gostas de")
VotosSuperior(2,"Gostas de")
questoes3anos()
totalVotos()
QuestaoComMaisVotos()