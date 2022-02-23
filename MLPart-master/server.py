from flask import Flask, request, Response
import main as m


app = Flask(__name__)

@app.route('/')
def main():
    return 'working'

@app.route('/query', methods=['GET', 'POST'])
def query():
    if request.method == 'GET':
        data = request.get_json()
        # print(data)
        try:
            # query = get_query(data)
            query = data['query']
            print(query)
            result = m.run(query)
            return result
        except:
            return Response(response='fail', status=201)
    return Response(response='POST Request', status=201)

# def get_query(data):
#     return data['query']