{/*
            <SwipeListView
                useFlatList
                data={this.state.entries}
                renderItem={ (data, rowMap) => (

                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("ViewEntryDetails", {paramName: data.item.LedgerName})}>
                    <View>
                        <Text style={styles.bigtitle}> {data.item.AccountName}</Text>
                        <Text style={styles.subtitle}> {new Date(data.item.Date).toLocaleTimeString()} </Text>
                    </View>
                    </TouchableOpacity>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
                            <Text style={styles.backTextWhite}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
                            <Text style={styles.backTextWhite}>Not Delete</Text>
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
            <View style={styles.container}>


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