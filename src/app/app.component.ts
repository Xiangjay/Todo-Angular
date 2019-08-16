import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public todoList: {
  //   id: number,
  //   title: string,
  //   completed: boolean,
  //   editing: boolean
  // }[] = [
  //   {
  //     id: 1,
  //     title:"study",
  //     completed: false,
  //     editing: false
  //   },
  //   {
  //     id: 2,
  //     title:"try",
  //     completed: false,
  //     editing: false
  //   },
  //   {
  //     id: 3,
  //     title:"expert",
  //     completed: true,
  //     editing: false
  //   }
  // ]
  public todoList: {
    id: number,
    title: string,
    completed: boolean,
    editing: boolean
  }[] = JSON.parse(window.localStorage.getItem("todoList") || "[]");
   public editing:boolean = false;

   public tem = this.todoList;

   public clickedFilter:string = "all";
   

  addNew(e):void{
    if(!e.target.value.length){
      return;
    }
    this.tem.push({
      id: this.todoList.length + 1,
      title: e.target.value,
      completed: false,
      editing: false
    })
    this.todoList = this.tem;
    e.target.value = '';
  }

  //暂时理解成computed
  get toggleAll(){
    return this.todoList.every(t=>t.completed)
  }

  //此处没十分理解
  set toggleAll(val){
    this.todoList.forEach(t=>t.completed = val);
  }

  removeList(index:number):void{
    this.todoList.splice(index,1)
  }

  edit(i:number){
    this.todoList.forEach(function(e){
      e.editing = false;
    });
    this.todoList[i].editing = true;
  }

  saveEdit(e,i){
    this.todoList[i].title = e.target.value;
    this.todoList[i].editing = false;
  }

  get remainCount():number{
    return this.todoList.filter(t=>!t.completed).length;
  }

  removeCompleted(){
    this.todoList = this.todoList.filter(t=>!t.completed);
  }

  filterTodoList(e:string){
    switch (e){
      case "all":
          this.clickedFilter = e;
          this.todoList = this.tem;
          break;
      case "active":
          this.clickedFilter = e;
          this.todoList = this.tem.filter(t=>!t.completed);
          break
      case "completed":
          this.clickedFilter = e;
          this.todoList = this.tem.filter(t=>t.completed);
          break;
    }
  }

  ngDoCheck(){
    window.localStorage.setItem("todoList",JSON.stringify(this.todoList));
    window.localStorage.setItem("tem",JSON.stringify(this.tem));
  }
}