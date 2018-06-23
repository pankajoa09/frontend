{/*
            <SwipeListView
                useFlatList
                data={this.state.entries}
                renderItem={ (data, rowMap) => (

                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("ViewEntryDetails", {paramName: data.item.Ledger})}>
                    <View>
                        <Text style={entry_details.bigtitle}> {data.item.AccountName}</Text>
                        <Text style={entry_details.subtitle}> {new Date(data.item.Date).toLocaleTimeString()} </Text>
                    </View>
                    </TouchableOpacity>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={entry_details.rowBack}>
                        <TouchableOpacity style={[entry_details.backRightBtn, entry_details.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
                            <Text style={entry_details.backTextWhite}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[entry_details.backRightBtn, entry_details.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
                            <Text style={entry_details.backTextWhite}>Not Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={this.onRowDidOpen}
            />
            */}


{/*
            <View style={entry_details.container}>


                <FlatList

                    data={this.state.entries}
                    renderItem={({item}) => {

                        return (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("ViewEntryDetails", {paramName: item})}>
                                <View>
                                    <Card containerStyle={{padding: 0}}>

                                        <ListItem
                                            title={item.AccountName}
                                            subtitle={new Intl.NumberFormat('en-GB', {
                                                style: 'currency',
                                                currency: item.Currency.toString()
                                            }).format(Number(item.Amount))}
                                            badge={{
                                                value: new Date(item.Date).toLocaleTimeString(),
                                                textStyle: {color: 'white'},
                                                containerStyle: {marginTop: -20}
                                            }}
                                        />
                                    </Card>
                                </View>
                            </TouchableOpacity>


                        );
                    }}

                    //stupid piece of code to stop dumb warnings
                    keyExtractor={() => Math.random().toString(36).substr(2, 9)}

                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    />
            </View>
            */}