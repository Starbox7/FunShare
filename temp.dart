import 'dart:async';
import 'dart:math' as math;
import 'dart:collection';

printInteger(int aNumber) {
  print('The number is $aNumber');
}

int? couldReturnNullButDoesnt() => -3;

Future<int> sumStream(Stream<int> stream) async {
  var sum = 0;
  await for (var value in stream) {
    print('sumStream : $value');
    sum += value;
  }
  return sum;
}

Stream<int> countStream(int to) async* {
  for (int i = 1; i <= to; i++) {
    print('countStream : $i');
    yield i;
  }
}

class Car {
  int maxSpeed;
  num price;
  String name;

  // 필드 매개변수로 초기화
  Car(this.maxSpeed, this.price, this.name);

  num saleCar() {
    price = price * 0.9;
    return price;
  }
}

main() async {
  var rand = math.Random();
  HashSet<int> lotteryNumber = HashSet();

  while (lotteryNumber.length < 6) {
    lotteryNumber.add(rand.nextInt(45));
  }
  print(lotteryNumber);

  // Car bmw = Car(320, 100000, 'BMW');
  // Car benz = Car(250, 70000, 'BENZ');
  // Car ford = Car(200, 80000, 'FORD');

  // bmw.saleCar();
  // bmw.saleCar();
  // bmw.saleCar();
  // print(bmw.price);

  // var stream = countStream(10);
  // var sum = await sumStream(stream);
  // print(sum);

  // var stream = Stream.fromIterable([1, 2, 3, 4, 5]);

  // stream.first.then((value) => print('first: $value'));
  // stream.last.then((value) => print('last: $value'));
  // stream..isEmpty.then((value) => print('isEmpty: $value'));
  // stream.length.then((value) => print('length: $value'));

  // var number = 42;
  // printInteger(number);

  // int? couldBeNullButIsnt = 1;
  // List<int?> listThatCouldHoldNulls = [2, null, 4];
  // List<int>? nullsList;

  // int a = couldBeNullButIsnt;
  // // int b = listThatCouldHoldNulls.first; //null error
  // int b = listThatCouldHoldNulls.first!;
  // // int c = couldReturnNullButDoesnt().abs()
  // int c = couldReturnNullButDoesnt()!.abs();

  // print('a is $a.');
  // print('b is $b.');
  // print('c is $c.');

  // checkVersion();
  // print('end process');

  // await getVersionName().then((value) => {print(value)});
  // print('end process');

  // printOne();
  // printTwo();
  // printThree();

  // var jsonString = '''
  // [
  // {"score": 40},
  // {"score": 80}
  // ]
  // ''';

  // var scores = jsonDecode(jsonString);
  // print(scores is List);
  // var firstScore = scores[0];
  // print(firstScore is Map);
  // print(firstScore['score'] == 40);

  // var scores2 = [
  //   {'score': 40},
  //   {'score': 80},
  //   {'score': 100, 'overtime': true, 'special_guest': null}
  // ];

  // var jsonText = jsonEncode(scores2);
  // print(jsonText !=
  //     '[{"score":40},{"score":80},'
  //         '{"score":100,"overtime":true,'
  //         '"special_guest":null}]');

  // for (int i = 2; i <= 9; i++) {
  //   for (int j = 1; j <= 9; j++) {
  //     print("$i * $j = ${i * j}");
  //   }
  // }
}

void printOne() {
  print('One');
}

void printThree() {
  print('Three');
}

void printTwo() async {
  await Future.delayed(Duration(seconds: 1), () {
    print("Future!!");
  });
  print('Two');
}

Future<String> getVersionName() async {
  var versionName = await lookUpVersionName();
  return versionName;
}

String lookUpVersionName() {
  return 'Android Q';
}

Future checkVersion() async {
  var version = await lookUpVersion();
  print(version);
}

int lookUpVersion() {
  return 12;
}
