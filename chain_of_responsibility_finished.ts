abstract class AbstractHandler<T> {
  private nextHandler: AbstractHandler<T>;
  next(handler: AbstractHandler<T>): AbstractHandler<T> {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: T): AbstractHandler<T> | null {
    return this.nextHandler ? this.nextHandler.handle(request) : null;
  }
}

enum Status {
  Received,
  Pending,
  InProcess,
  Sent,
  Delivered,
}
enum Priority {
  Low,
  Medium,
  High,
  Urgent,
}

interface Order {
  id: number;
  itemCount: number;
  ordered: string;
  expectedDelivery: string;
  status: Status;
  priority: Priority;
}

const orders: Order[] = [
  {
    id: 1,
    itemCount: 3,
    ordered: "08/12/2020",
    expectedDelivery: "9/15/2020",
    status: Status.Pending,
    priority: Priority.Low,
  },
  {
    id: 2,
    itemCount: 15,
    ordered: "06/10/2020",
    expectedDelivery: "8/15/2020",
    status: Status.Pending,
    priority: Priority.High,
  },
  {
    id: 3,
    itemCount: 1,
    ordered: "08/12/2020",
    expectedDelivery: "9/15/2020",
    status: Status.Sent,
    priority: Priority.Low,
  },
];

class OrderManager {
  private readonly orders: Order[];

  constructor(orders: Order[]) {
    this.orders = orders;
  }

  process(handler: AbstractHandler<Order>) {
    for (const order of this.orders) {
      console.log(order);
      handler.handle(order);
    }
  }
}

class ValidateOrderId extends AbstractHandler<Order> {
  public handle(request: Order) {
    if (request.id === 2) {
      return null;
    }
    return super.handle(request);
  }
}

class ValidateStatus extends AbstractHandler<Order> {
  public handle(request: Order) {
    if (request.status === Status.Delivered) {
      return null;
    }
    return super.handle(request);
  }
}

class PriorityCheck extends AbstractHandler<Order> {
  public handle(request: Order) {
    if (
      request.priority === Priority.Urgent &&
      request.status !== Status.Delivered
    ) {
      return super.handle(request);
    }
    return null;
  }
}

const validateId = new ValidateOrderId();
const validateStatus = new ValidateStatus();
const priorityCheck = new PriorityCheck();
const newOrderFlow = new ValidateOrderId()
  .next(new ValidateStatus())
  .next(new PriorityCheck());

/**
 *  todo: each order need be process in the following order:
 *   - validate: if the order id is valid. if not, no need to check status
 *   - check status: if received, move to done - no need to check priority
 *   - check priority: if urgent, send to a urgent queue and return
 */
const orderManager = new OrderManager(orders);
orderManager.process(newOrderFlow);
