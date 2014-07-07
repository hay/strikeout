<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Helvetica Neue';
            font-size: 16px;
        }

        #app {
            display: -webkit-flex;
            background: red;
            overflow: auto;
        }

        header {
            background: orange;
        }

        li {
            list-style: none;
            padding: 0;
            height: 40px;
            background: navy;
            color: white;
            margin-bottom: 10px;
        }

        #lists {
            background: yellow;
            -webkit-flex-grow: 1;
        }

        #items {
            background: green;
            -webkit-flex-grow: 2;
        }

        #lists, #items {
            -webkit-flex-direction: row;
            padding: 15px;
        }
    </style>
</head>
<body>
    <div id="app">
        <div id="lists">
            <header>Kittylist</header>
            <ul>
                <?php for ($i = 0; $i < 30; $i++) : ?>
                <li>List <?php echo $i; ?>
                <?php endfor; ?>
            </ul>
        </div>

        <div id="items">
            <ul>
                <?php for ($i = 0; $i < 30; $i++) : ?>
                <li>Item <?php echo $i; ?>
                <?php endfor; ?>
            </ul>
        </div>
    </div>
</body>
</html>