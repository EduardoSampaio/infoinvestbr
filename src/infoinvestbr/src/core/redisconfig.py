import redis

redis_instance = redis.Redis(host='localhost', port=6379, db=0)


def get_value_redis(key: str):
    return redis_instance.get(key)


def set_value_redis(key: str, valor: str):
    redis_instance.set(key, valor)


def delete_value(key: str):
    redis_instance.delete(key)
