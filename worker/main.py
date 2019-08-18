import os
import time
import logging
import signal

import redis

QUEUE = 'scenario:optimize'

logging.basicConfig(level=logging.INFO)

client = redis.from_url('redis://localhost:6379/0')


class Model(object):
    def __init__(self, sid):
        self.sid = sid

    def solve(self):
        time.sleep(5)


class Task(object):

    def __init__(self, pid):
        self._pid = pid

    def run(self, sid):
        model = Model(sid)
        model.solve()

    def terminate(self):
        try:
            logging.info(f'killing process {self._pid}')
            os.kill(self._pid, signal.SIGKILL)
        except OSError as e:
            # ignore if unknown
            if e.errno != os.errno.ESRCH:
                raise


class Worker(object):
    def __init__(self):
        self._task = None

    def get_sid(self):
        message = client.blpop(QUEUE, 0)
        if not message:
            return
        # (b'QUEUE', b'sid')
        return message[1]

    def start(self):
        while True:
            try:
                logging.info('Waiting for scenario...')
                sid = self.get_sid()
                if not sid:
                    continue
                logging.info(f'Started processing scenario {sid}')
                time.sleep(5)
                logging.info(f'Finished processing scenario {sid}')
            except Exception as e:
                logging.exception(e)


worker = Worker()

if __name__ == '__main__':
    worker.start()
