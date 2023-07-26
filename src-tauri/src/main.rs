// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#![allow(warnings)]
mod graph;
mod node;
mod edge;
mod player;
mod buildgraph;
mod color_enum;
mod shortest_path;

use node::tnode::Node;
use graph::tgraph::Graph;
use shortest_path::short_path::djikstras;


use std::sync::{Arc,Mutex};
use tauri::State;

struct GlobalGraph {
    graph: Arc<Mutex<Graph<Node>>>,
}

impl GlobalGraph {
    fn new() -> Self {
        Self {
            graph: Arc::new(Mutex::new(Graph::new())),
        }
    }
}

fn main() {
  tauri::Builder::default()
    .manage(GlobalGraph::new())
    .invoke_handler(tauri::generate_handler![add_node,add_bidirectional_edge,reset_graph,print_graph,get_shortest_path])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command(rename_all = "snake_case")]
fn add_node(node_id: u32, node_name: String, graph: State<'_,GlobalGraph>) {
    let mut graph = graph.graph.lock().unwrap();
    graph.add_node(Node::new(node_id,node_name));
}

#[tauri::command(rename_all = "snake_case")]
fn add_bidirectional_edge(node1_id: u32, node1_name: String, node2_id: u32, node2_name: String, edge_weight: usize, graph: State<'_,GlobalGraph>){
    let mut graph = graph.graph.lock().unwrap();
    graph.add_bidirectional_edge(Node::new(node1_id, node1_name), Node::new(node2_id, node2_name), edge_weight);
}

#[tauri::command(rename_all = "snake_case")]
fn reset_graph(graph: State<'_,GlobalGraph>){
    let mut graph = graph.graph.lock().unwrap();
    graph.reset_graph();
}

#[tauri::command(rename_all = "snake_case")]
fn print_graph(graph: State<'_,GlobalGraph>){
    let mut graph = graph.graph.lock().unwrap();
    println!("New graph:");
    graph.print_graph();
}

#[tauri::command(rename_all = "snake_case")]
fn get_shortest_path(start_node_id: Node, end_node_id: Node, graph: State<'_,GlobalGraph>) {
    let mut graph = graph.graph.lock().unwrap();
    let mut afa = djikstras(*graph, start_node_id, end_node_id);
    println!("{:?}", afa);
}

