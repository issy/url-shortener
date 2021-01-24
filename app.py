from flask import Flask, request, render_template, redirect, url_for
from pymongo import MongoClient
import os
import random
import string


app = Flask(__name__)
db = MongoClient(os.environ.get('MONGO_URI', None))
if not db:
    raise RuntimeError("Could not connect to DB")
db = db['url-shortener']


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/add-link', methods=['POST'])
def add_link():
    try:
        body = request.get_json(force=True)
        print(body)
    except:
        print('reeeee')
        print(request.data)
        return {'message': 'no body specified'}, 400
    url = body.get('target_url', None)
    while True:
        new_id = ''.join(random.choice(
            string.ascii_letters + string.digits) for i in range(5))
        check = db.urls.find_one({"id": new_id})
        if not check:
            db.urls.insert_one({"id": new_id, "url": url})
            return {'url': url_for('visit', id=new_id, _external=True)}, 201


@app.route('/v/<id>', methods=['GET'])
def visit(id: str):
    check = db.urls.find_one({"id": id})
    if not check:
        return render_template('404.html'), 404
    return redirect(check['url'], code=302)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
