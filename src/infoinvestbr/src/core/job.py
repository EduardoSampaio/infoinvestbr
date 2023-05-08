import pytz
from apscheduler.schedulers.background import BackgroundScheduler
from src.core import task

scheduler = BackgroundScheduler(timezone=pytz.timezone('America/Sao_Paulo'))
scheduler.add_job(task.job_atualizacao_cotacao_preco, 'cron', hour=15, minute=33, second=0,
                  id="job_atualizacao_cotacao_preco")
